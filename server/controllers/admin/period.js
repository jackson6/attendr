// PeriodController.js

const Period = require('../../models').Period;

module.exports = {
    async list(req, res) {
        return Period
          .all({})
          .then(periods => res.status(200).send({
              result: true,
              periods: periods
          }))
          .catch(error => res.status(400).send({
              result: false,
              msg: error
          }));
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
        .then(period => res.status(201).send({result: true, period:period}))
        .catch(error => res.status(400).send({result: false, msg:error}));
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
              .then(() => res.status(200).send({result: true, period:period}))  // Send back the updated period.
              .catch((error) => res.status(400).send({result: false, msg:error}));
          })
          .catch((error) => res.status(400).send({result: false, msg:error}));
    },
};