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
          .then(classroom => res.status(200).send(classroom))
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
                message: 'Classroom Not Found',
              });
            }
            return res.status(200).send(classroom);
          })
          .catch(error => res.status(400).send(error));
    },
    create(req, res) {
      return Classroom
        .create({
          classId: req.body.class_id,
          periodId: req.body.period_id,
          grade: req.body.grade,
          stream: req.body.stream,
        })
        .then(classroom => res.status(201).send(classroom))
        .catch(error => res.status(400).send(error));
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
              .then(() => res.status(200).send(classroom))  // Send back the updated period.
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
    },
    async generateClasses(grades, streams, period){
      let classes = [];
      for(const grade of grades){
        for(const stream of streams){
          let classroom = period + grade + stream;
          classes.push({grade:grade, stream:stream, periodId: period, classId: classroom})
        }
      }
      return classes
    }
};