// PeriodController.js

const Classroom = require('../../models').Class;
const ClassTeacher  = require('../../models').ClassTeacher;

module.exports = {
    assignTeacher(classroom, teacher){
        try {
            return ClassTeacher
                .create({
                    classId: classroom,
                    userId: teacher,
                })
        } catch(e) {
            throw e;
        }
    },
    getClass(id) {
        try {
            return Classroom
                .findById(id)
        } catch (e) {
            throw e;
        }
    },
    list(req, res) {
        return Classroom
          .all({
              include: [
                  'students',
                  'formTeachers'
              ]
          })
          .then(classrooms => res.status(200).send({result: true, classrooms: classrooms}))
          .catch(error => res.status(400).send({result: false, msg: error}));
    },
    retrieve(req, res) {
        return Classroom
          .findById(req.params.classId, {
              include: [
                  'students',
                  'formTeachers'
              ]
          })
          .then(classroom => {
            if (!classroom) {
              return res.status(404).send({
                  result: false,
                  message: 'Classroom Not Found',
              });
            }
            return res.status(200).send({result: true, classroom: classroom});
          })
          .catch(error => res.status(400).send({result: false, msg: error}));
    },
    create(req, res) {
      return Classroom
        .create({
          periodId: req.body.periodId,
          grade: req.body.grade,
          stream: req.body.stream,
        })
        .then(classroom => res.status(201).send({result: true, classroom: classroom}))
        .catch(error => res.status(400).send({result: false, msg: error}));
    },
    async createBulk(classes) {
      try {
        return Classroom
        .bulkCreate(classes)
      } catch (e){
        throw e
      }
    },
    update(req, res) {
        return Classroom
          .findById(req.body.classId, {})
          .then(classroom => {
            if (!classroom) {
              return res.status(404).send({
                message: 'Class Not Found',
              });
            }
            return classroom
              .update({
                grade: req.body.grade || classroom.grade,
                stream: req.body.stream || classroom.stream
              })
              .then(() => res.status(200).send({result: true, classroom: classroom}))  // Send back the updated period.
              .catch((error) => res.status(400).send({result: false, msg: error}));
          })
          .catch((error) => res.status(400).send({result: false, msg: error}));
    },
    async generateClasses(grades, period){
      let classes = [];
      for(const grade of grades){
        for(const stream of grade.streams){
          classes.push({grade:grade.grade, stream:stream, periodId: period})
        }
      }
      return classes
    }
};