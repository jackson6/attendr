// PeriodController.js

const Holiday = require('../../models').Holiday;
const HolidayPeriod = require('../../models').HolidayPeriod;

module.exports = {
    assignHoliday(req, res){
        return HolidayPeriod
            .create({
                periodId: req.body.period_id,
                holidayId: req.body.holiday_id,
                startYear: req.body.start_year,
                endYear: req.body.end_year,
            })
            .then(holiday => res.status(200).send(holiday))
            .catch(error => res.status(400).send({result: false, msg: error}));
    },
    list(req, res) {
        return Holiday
            .all({})
            .then(holiday => res.status(200).send(holiday))
            .catch(error => res.status(400).send({result: false, msg: error}));
    },
    retrieve(req, res) {
        return Holiday
            .findById(req.params.holidayId, {})
            .then(holiday => {
                if (!holiday) {
                    return res.status(404).send({
                        message: 'Classroom Not Found',
                    });
                }
                return res.status(200).send(holiday);
            })
            .catch(error => res.status(400).send(error));
    },
    create(req, res) {
        return Holiday
            .create({
                holidayId: new Date(req.body.start_date).getTime().toString(),
                name: req.body.name,
                startDate: req.body.start_date,
                endDate: req.body.end_date,
            })
            .then(holiday => res.status(201).send(holiday))
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Holiday
            .findById(req.body.holidayId, {})
            .then(holiday => {
                if (!holiday) {
                    return res.status(404).send({
                        message: 'Holiday Not Found',
                    });
                }
                return holiday
                    .update({
                        name: req.body.name || holiday.name,
                        startDate: req.body.start_date || holiday.startDate,
                        endDate: req.body.end_date || holiday.endDate
                    })
                    .then(() => res.status(200).send(holiday))  // Send back the updated holiday.
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    async getDays( date1, date2 ) {
        var one_day=1000*60*60*24;

        // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();

        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;

        console.log("days", Math.round(difference_ms/one_day));

        // Convert back to days and return
        return Math.round(difference_ms/one_day);
    },
    async addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    },
    async parseHoliday(holidays){
        let dates = [];

        for(const holiday of holidays){
            try {
                var start_date = new Date(holiday.startDate+"/"+holiday.HolidayPeriod.startYear);
                var end_date = new Date(holiday.endDate+"/"+holiday.HolidayPeriod.endYear);
                let days = await this.getDays(start_date, end_date);
                for(var i=0; i<(days+1); i++) {
                    let day = await this.addDays(holiday.startDate, i);
                    dates.push(day)
                }
            }catch(e){
                console.log("error", e);
                throw e;
            }
        }
        return period
    }

};