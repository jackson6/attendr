// GradeController.js

const Grade = require('../../models').ClassConfig;

module.exports = {
    async getGrade(id) {
        try {
            return Grade
                .findById(id)
        } catch (e){
            throw e
        }
    },
    async getGrades() {
        try {
            return Grade
                .all()
        } catch (e){
            throw e
        }
    },
    list(req, res) {
        return Grade
            .all()
            .then(grades => res.status(200).send({result: true, students: grades}))
            .catch(error => res.status(400).send({result: false, msg: error}));
    },
    retrieve(req, res) {
        return Grade
            .findById(req.params.gradeId)
            .then(grades => {
                if (!grades) {
                    return res.status(404).send({
                        message: 'Grade Not Found',
                    });
                }
                return res.status(200).send({result: true, grades: grades});
            })
            .catch(error => res.status(400).send({result: false, msg: error}));
    },
    create(req, res) {
        return Grade
            .create({
                grade: req.body.grade,
                streams: req.body.streams,
            })
            .then(grades => res.status(201).send({result: true, grades: grades}))
            .catch(error => res.status(400).send({result: false, msg: error}));
    },
    update(req, res) {
        return Grade
            .findById(req.body.gradeId)
            .then(grade => {
                if (!grade) {
                    return res.status(404).send({
                        message: 'Grade Not Found',
                    });
                }
                return grade
                    .update({
                        grade: req.body.grade || grade.grade,
                        lastName: req.body.streams || grade.streams,
                    })
                    .then(() => res.status(200).send({result: true, grade: grade}))  // Send back the updated student.
                    .catch((error) => res.status(400).send({result: false, msg: error}));
            })
            .catch((error) => res.status(400).send({result: false, msg: error}));
    },
    delete(req, res){
        return Grade
            .findById(req.body.gradeId, {})
            .then(grade => {
                if (!grade) {
                    return res.status(404).send({
                        result: false,
                        message: 'Grade Not Found',
                    });
                }
                grade.destroy()
                    .then(() => {

                        res.status(200).send({result: true, msg: "Grade deleted successfully"})
                    })  // Send back the updated user.
                    .catch((error) => res.status(400).send({result: false, msg: error}));
            })
            .catch((error) => res.status(400).send({result: false, msg: error}));
    },
};