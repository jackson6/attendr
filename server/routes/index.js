
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'upload/'});

const adminUserController = require('../controllers/admin').user;
const adminPeriodController = require('../controllers/admin').period;
const adminClassController = require('../controllers/admin').classroom;
const adminStudentController = require('../controllers/admin').student;
const adminHolidayController = require('../controllers/admin').holiday;

const auth = require('../middleware/verifyToken');

const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");

module.exports = (app) => {


    app.post('/admin/user', adminUserController.create);
    app.put('/admin/user', adminUserController.update);
    app.get('/admin/user', adminUserController.list);

    app.post('/admin/login', adminUserController.login);
    app.post('/admin/user', adminUserController.create);
    app.put('/admin/user', adminUserController.update);
    app.get('/admin/user', adminUserController.list);
    app.get('/admin/user/:userId', adminUserController.retrieve);

    app.put('/admin/period', adminPeriodController.update);
    
    app.get('/admin/period', adminPeriodController.list);

    app.get('/admin/period/:periodId', async (req, res) => {
        try {
            let period = await adminPeriodController.retrieve(req.params.periodId);
            period.holidays = await adminHolidayController.parseHoliday(period.holidays);

            res.status(200).send({result: true, period: period})
        } catch(e) {
            res.status(400).send({result: false, msg:e})
        }
    });

    app.post('/admin/period', auth, async (req, res) => {

        try {
            let period = await adminPeriodController.create(req.body.periodId, req.body.name, req.body.start, req.body.end);
            let classes = await adminClassController.generateClasses(req.body.grades, req.body.streams, period.periodId);

            adminClassController.createBulk(classes, req, res)
            .then(classes => {
                period.classes = classes
                res.status(200).send(period)
            })
            .catch(error => {
                res.status(400).send({result: false, msg: error})
            })
        } catch (e) {
            res.status(400).send({result: false, msg: e})
        }

    });

    app.put('/admin/class', adminClassController.update);
    app.get('/admin/class', adminClassController.list);
    app.get('/admin/class/:classId', adminClassController.retrieve);

    app.post('/admin/student', adminStudentController.create);
    app.put('/admin/student', adminStudentController.update);
    app.get('/admin/student', adminStudentController.list);
    app.get('/admin/student/:studentId', adminStudentController.retrieve);

    app.post('/admin/upload/student', upload.single('file'), auth, async (req, res) => {

        if(!req.file){
            res.json({ result: false, msg: "No file passed" });
            return;
        }

        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }

        try {
            exceltojson({
                input: req.file.path, //the same path where we uploaded our file
                output: null, //since we don't need output.json
                lowerCaseHeaders:true
            }, function(err, students){
                if(err) {
                    return res.json({ result: false, msg: err });
                }

                adminStudentController.createBulk(students)
                    .then(classes => {
                        res.status(200).send({ result: true, data:students })
                    })
                    .catch(error => {
                        res.status(400).send({ result: false, msg: error })
                    })

                try {
                    fs.unlinkSync(req.file.path);
                } catch(e) {
                    console.log(e)
                }
            });
        } catch (e){
            res.json({ result: false, msg: "Corrupted excel file" });
        }
    });

    app.post('/admin/assign/student', auth, async (req, res) => {

        try {
            let classroom = await adminClassController.getClass(req.body.classId);
            let student = await adminStudentController.getStudent(req.body.studentId);

            classroom.addStudent(student, { through: {}});
            res.status(200).send({ result: true, classroom: classroom, student: student })
        } catch(e) {
            res.status(400).send({ result: false, msg: e })
        }
    });


    app.post('/admin/upload/teacher', upload.single('file'), auth, async (req, res) => {

        if(!req.file){
            res.json({ result: false, msg: "No file passed" });
            return;
        }

        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }

        try {
            exceltojson({
                input: req.file.path, //the same path where we uploaded our file
                output: null, //since we don't need output.json
                lowerCaseHeaders:true
            }, function(err, list){
                if(err) {
                    return res.json({ result: false, msg: err });
                }

                teachers = adminUserController.generateBulkTeachers(list);

                teachers.forEach(function (teacher) {

                })

                adminUserController.createBulkTeacher(teachers)
                    .then(classes => {
                        res.status(200).send({ result: true, data: teachers })
                    })
                    .catch(error => {
                        res.status(400).send({ result: false, msg: error })
                    })

                try {
                    fs.unlinkSync(req.file.path);
                } catch(e) {
                    console.log(e)
                }
            });
        } catch (e){
            res.json({ result: false, msg: "Corrupted excel file" });
        }

    });

    app.post('/admin/assign/teacher', auth, async (req, res) => {

        try {
            let classroom = await adminClassController.getClass(req.body.classId);
            let teacher = await adminUserController.getUser(req.body.userId);

            if(teacher == undefined){
                res.status(406).send({ result: false, msg: "Could not find teacher" })
            }

            if(classroom == undefined){
                res.status(406).send({ result: false, msg: "Could not find classroom" })
            }

            adminClassController.assignTeacher(classroom.classId, teacher.userId);
        } catch(e) {
            res.status(400).send({ result: false, msg: e })
        }

    });

    app.post('/admin/holiday', adminHolidayController.create);
    app.put('/admin/holiday', adminHolidayController.update);
    app.get('/admin/holiday', adminHolidayController.list);
    app.get('/admin/holiday/:holidayId', adminHolidayController.retrieve);
    app.post('/admin/assign/holiday', adminHolidayController.assignHoliday);
};