
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'upload/'});

const adminUserController = require('../controllers/admin').user;
const adminPeriodController = require('../controllers/admin').period;
const adminClassController = require('../controllers/admin').classroom;
const adminStudentController = require('../controllers/admin').student;

const auth = require('../middleware/verifyToken');

const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/admin/login', adminUserController.login);
  app.post('/admin/user', adminUserController.create);
  app.put('/admin/user', adminUserController.update);
  app.get('/admin/user', adminUserController.list);
  app.get('/admin/user/:userId', adminUserController.retrieve);

  app.post('/admin/period', adminPeriodController.create);
  app.put('/admin/period', adminPeriodController.update);
  app.get('/admin/period', adminPeriodController.list);
  app.get('/admin/period/:periodId', adminPeriodController.retrieve);
  
  app.post('/admin/period/class', auth, async (req, res) => {
    let grades = ['7', '8', '9', '10', '11', '12', '13'];
    let streams = ['1', '2', '3', '4', '5'];
    let period = "001";

    classes = await adminClassController.generateClasses(grades, streams, period)
    adminClassController.createBulk(classes, req, res)
    .then(classes => {
      res.status(200).send(classes)
    })
    .catch(error => {
      res.status(400).send(error)
    })

  });

  app.put('/admin/class', adminClassController.update);
  app.get('/admin/class', adminClassController.list);
  //app.post('/admin/assign/class', adminClassController.assignClass);
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
        res.json({ result: false, msg: "Corupted excel file" });
    }

  });

  app.post('/admin/assign/student', auth, async (req, res) => {

    try {
      let classromm = await adminClassController.getClass(req.body.class_id);
      let student = await adminStudentController.getStudent(req.body.student_id);

      classromm.addStudent(student, { through: {}});
      res.status(200).send({ result: true, classroom: classromm, student: student })
      
    } catch(e) {
        res.status(400).send({ result: false, msg: e })
    }

  });

};