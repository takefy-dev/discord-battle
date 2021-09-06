
module.exports =  (database, DataTypes) => {
  const modelName = 'users'
  try {
    database.define(modelName, {
      discordId: {
        type: DataTypes.STRING(25),
        allowNull: false,
        primaryKey: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      discriminator: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    }, {
      tableName: modelName,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    })
    database.models[modelName].sync({
      alter:true
    })
    return database.models[modelName]
  } catch (e) {
    console.log(e)
  }
}
