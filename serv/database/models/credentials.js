
module.exports =  (database, DataTypes) => {
  const modelName = 'credentials'
  try {
    database.define(modelName, {
      discordId: {
        type: DataTypes.STRING(25),
        allowNull: false,
        primaryKey: true,
      },
      accessToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: modelName,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    })
    database.models[modelName].sync({
      alter: true
    })
    return database.models[modelName]
  } catch (e) {
    console.log(e)
  }
}
