// PeriodController.js

const Period = require('../../models').Period;
const ClassRoom = require('../../models').Class;

module.exports = {
    list(req, res) {
        return Period
          .all({
            include: [ 'classrooms' ],
          })
          .then(period => res.status(200).send(period))
          .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
      return Period
        .findById(req.params.periodId, {
          include: [ 'classrooms' ],
        })
        .then(period => {
          if (!period) {
            return res.status(404).send({
              message: 'Period Not Found',
            });
          }
          return res.status(200).send(period);
        })
        .catch(error => res.status(400).send(error));
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