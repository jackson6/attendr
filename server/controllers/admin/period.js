// PeriodController.js

const Period = require('../../models').Period;
const ClassRoom = require('../../models').Class;

module.exports = {
    async list() {
        return Period
          .all({
            include: [
                'classrooms',
                'holidays'
            ],
          })
          .then(period => { return period })
          .catch(error => { throw error });
    },
    async retrieve(periodId) {
      return Period
        .findById(periodId, {
          include: [
              'classrooms',
              'holidays'
          ],
        })
        .then(period => {
          if (!period) {
            return res.status(404).send({
              message: 'Period Not Found',
            });
          }
          return period;
        })
        .catch(error => { throw error });
    },
    create(req, res) {
      return Period
        .create({
          periodId: req.body.period_id,
          name: req.body.name,
          start: req.body.start,
          end: req.body.end,
        })
        .then(period => res.status(201).send(period))
        .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Period
          .findById(req.body.periodId, {
              include: [ 'classrooms' ],
          })
          .then(period => {
            if (!period) {
              return res.status(404).send({
                message: 'Period Not Found',
              });
            }
            return period
              .update({
                name: req.body.name || period.name,
                start: req.body.start || period.start,
                end: req.body.end || period.end,
              })
              .then(() => res.status(200).send(period))  // Send back the updated period.
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
    },
};