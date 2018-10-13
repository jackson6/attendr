// StudentController.js

const Student = require('../../models').Student;

module.exports = {
    getStudent(id) {
      try {
        return Student
        .findById(id)
      } catch (e){
        throw e
      }
    },
    list(req, res) {
        return Student
          .all()
          .then(students => res.status(200).send({result: true, students: students}))
          .catch(error => res.status(400).send({result: false, msg: error}));
    },
    retrieve(req, res) {
      return Student
        .findById(req.params.studentId)
        .then(student => {
          if (!student) {
            return res.status(404).send({
              message: 'Student Not Found',
            });
          }
          return res.status(200).send({result: true, student: student});
        })
        .catch(error => res.status(400).send({result: false, msg: error}));
    },
    create(req, res) {
      return Student
        .create({
          studentId: req.body.studentId,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          gender: req.body.gender
        })
        .then(student => res.status(201).send({result: true, student: student}))
        .catch(error => res.status(400).send({result: false, msg: error}));
    },
    async createBulk(students) {
      try {
        return Student
        .bulkCreate(students)
      } catch (e){
        throw e
      }
    },
    update(req, res) {
        return Student
          .findById(req.body.studentId)
          .then(student => {
            if (!student) {
              return res.status(404).send({
                message: 'Student Not Found',
              });
            }
            return student
              .update({
                firstName: req.body.firstName || student.firstName,
                lastName: req.body.lastName || student.lastName,
                gender: req.body.gender || student.gender,
              })
              .then(() => res.status(200).send({result: true, student: student}))  // Send back the updated student.
              .catch((error) => res.status(400).send({result: false, msg: error}));
          })
          .catch((error) => res.status(400).send({result: false, msg: error}));
    },
};