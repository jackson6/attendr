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
          .then(student => res.status(200).send(student))
          .catch(error => res.status(400).send(error));
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
          return res.status(200).send(student);
        })
        .catch(error => res.status(400).send(error));
    },
    create(req, res) {
      return Student
        .create({
          studentId: req.body.student_id,
          firstName: req.body.first_name,
          lastName: req.body.last_name,
          gender: req.body.gender
        })
        .then(student => res.status(201).send(student))
        .catch(error => res.status(400).send(error));
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
                firstName: req.body.first_name || student.firstName,
                lastName: req.body.last_name || student.lastName,
                gender: req.body.gender || student.gender,
              })
              .then(() => res.status(200).send(student))  // Send back the updated student.
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
    },
};