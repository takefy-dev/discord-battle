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
    return user.get() ? done(null, user.get()) : done(null, null)
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
    console.log(profile)
    const {
        id,
        avatar,
        email,
        username,
        discriminator
      } = profile,
      encryptedAccessToken = encrypt(accessToken).toString(),
      encryptedRefreshToken = encrypt(refreshToken).toString()
    global.database.updateOrCreate(global.database.database.models['users'], {
      discordId: id
    }, {
      discordId: id,
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
          email,
          discordId: id
        })
        return done(null, user.get())
      }

    } catch (e) {
      console.log(e)
      return done(e, null)
    }

  })
)

