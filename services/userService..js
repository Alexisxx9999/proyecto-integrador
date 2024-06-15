const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

class userService {
  constructor() {}

  async find() {
    const rta = await models.User.findAll();
    return rta;
    /*  const query = 'select * from  usuarios';
    const [data] = await sequelize.query(query);
    return {
      data,
    }; */
  }
  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: { email },
    });
    return rta;
    /*  const query = 'select * from  usuarios';
    const [data] = await sequelize.query(query);
    return {
      data,
    }; */
  }
  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }
  async create(data) {
    const hash = await bcrypt.hash(data.contraseña, 10);
    const newUser = await models.User.create({
      ...data,
      contraseña: hash,
    });
    delete newUser.dataValues.contraseña;
    return newUser;
  }
  async update(id, change) {
    const user = await this.findOne(id);
    /* const user = await models.User.findByPk(id); */
    const rta = user.update(change);
    return rta;
  }
  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}
module.exports = userService;
