const { Sequelize, DataTypes } =  require('sequelize'),
  {name, password, username} = require('../config').database,
  fs = require('fs')

module.exports = class Database {
  constructor () {
    this.database = new Sequelize(name, username, password, {
      dialect: 'mysql',
      define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        timestamps: false,
        freezeTableName: true,
      },
      dialectOptions: {
        connectTimeout: 60000
      },
      logging: false
    })
    this.initDatabase()
  }
  initDatabase() {
  this.database.authenticate().then(async () => {
    await this.database.sync()
    console.log('Database is now loggeed in');
    const modelsFile = fs.readdirSync('./database/models');
    for await (const model of modelsFile) {
      await require(`./models/${model}`)(this.database, DataTypes)
      console.log(`Loading model ${model}`)
    }
  })
  }
  updateOrCreate(model, where, newItem) {
    return new Promise((resolve, reject) => {
      model.findOne({where}).then(foundItem => {
        if (!foundItem)
          model.create(newItem).then(item => resolve({item, created: true})).catch(e => reject(e))
        else
          model.update(newItem, {where}).then(item => resolve({item, created: false})).catch(e => reject(e))
      }).catch(e => reject(e))
    })
  }
}
