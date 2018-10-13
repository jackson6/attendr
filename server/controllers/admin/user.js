const User = require('../../models').User;
var config = require('../../config');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    getUser(id) {
        try {
            return User
                .findById(id)
        }catch(e){
            throw e;
        }
    },
    async login(req, res) {
        return User.findById(req.body.user_id).then(user => {
            if (!user) {
                return res.status(404).send({
                    result: false,
                    message: 'User Not Found',
                });
            }
            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({ result: false, user: null });
            user = JSON.parse(JSON.stringify(user))
            try {
                delete user.password
            } catch (e){
                console.log(e)
            }

            user.token = jwt.sign({ id: user.userId }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({ result: true, user: user });
        }).catch(error => res.status(400).send({result: false, msg: error}));
    },
    list(req, res) {
        return User
          .all({
            attributes: ['userId', 'firstName', 'lastName', 'role', 'title', 'createdAt', 'updatedAt'],
          })
          .then(user => {
            res.status(200).send({result: true, user: user})
          })
          .catch(error => res.status(400).send({result: false, msg: error}));
    },
    retrieve(req, res) {
      return User
        .findById(req.params.userId, {})
        .then(user => {
          if (!user) {
            return res.status(404).send({
                result: false,
                message: 'User Not Found',
            });
          }
          user = JSON.parse(JSON.stringify(user))

          try {
            delete user.password
          } catch (e){
            console.log(e)
          }

          return res.status(200).send({result: true, user: user});
        })
        .catch(error => res.status(400).send({result: false, msg: error}));
    },
    create(req, res) {
      return User
        .create({
          userId: req.body.user_id,
          firstName: req.body.first_name,
          lastName: req.body.last_name,
          role: req.body.role,
          title: req.body.title,
          password: bcrypt.hashSync(req.body.password, 8)
        })
        .then(user => {
          user = JSON.parse(JSON.stringify(user))

          try {
            delete user.password
          } catch (e){
            console.log(e)
          }

          res.status(200).send({result: true, user: user})
        })
        .catch(error => res.status(400).send({result: false, msg: error}));
    },
    update(req, res) {
      return User
        .findById(req.body.userId, {})
        .then(user => {
          if (!user) {
            return res.status(404).send({
                result: false,
                message: 'User Not Found',
            });
          }
          return user
            .update({
              firstName: req.body.first_name || user.firstName,
              lastName: req.body.last_name || user.lastName,
              role: req.body.role || user.role,
              title: req.body.title || user.title,
              passowrd: bcrypt.hashSync(req.body.password, 8) || user.passowrd
            })
          .then(() => {
            user = JSON.parse(JSON.stringify(user))

            try {
              delete user.password
            } catch (e){
              console.log(e)
            }

            res.status(200).send({result: true, user: user})
          })  // Send back the updated user.
            .catch((error) => res.status(400).send({result: false, msg: error}));
        })
        .catch((error) => res.status(400).send({result: false, msg: error}));
    },
    async createBulkTeacher(teachers) {
        try {
            return User
                .bulkCreate(teachers)
        } catch (e){
            throw e
        }
    },
    async generateBulkTeachers(teachers){
        let list = [];
        for(const teacher of teachers){
            teacher.password = teacher.id + Math.floor((Math.random() * 100) + 1);
            teacher.role = 2
            list.push(teacher)
        }
        return list
    }
};