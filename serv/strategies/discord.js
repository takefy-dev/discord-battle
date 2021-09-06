const passport = require('passport'),
  DiscordStrategy = require('passport-discord'),
  {
    clientId,
    clientSecret,
    callbackURL
  } = require('../config').oauth,
  {
    encrypt,
    decrypt
  } = require('../utils')

passport.serializeUser((user, done) => {
  done(null, user.discordId)
})
passport.deserializeUser(async (discordId, done) => {
  try {
    const user = await global.database.database.models.users.findOne({ where: { discordId } })
    return user ? done(null, user) : done(null, null)
  } catch (e) {
    console.log(e)
    return done(e, null)
  }
})
passport.use(
  'discord',
  new DiscordStrategy({
    clientID: clientId,
    clientSecret,
    callbackURL,
    scope: ['identify', 'email']
  }, async (accessToken, refreshToken, profile, done) => {
    const {
        id,
        email,
        avatar,
        username,
        discriminator
      } = profile,
      encryptedAccessToken = encrypt(accessToken).toString(),
      encryptedRefreshToken = encrypt(refreshToken).toString()
    global.database.updateOrCreate(global.database.database.models['users'], {
      discordId: id
    }, {
      discordId: id,
      email,
      avatar,
      username,
      discriminator,
      accessToken,
      refreshToken
    })
    try {
      const user = await global.database.database.models.users.findOne({ where: { discordId: id } })
      if (user) {
        global.database.updateOrCreate(global.database.database.models.credentials, {
          discordId: id
        }, {
          accessToken: encryptedAccessToken,
          refreshToken: encryptedRefreshToken,
          discordId: id
        })
        return done(null, user)
      }

    } catch (e) {
      console.log(e)
      return done(e, null)
    }

  })
)

