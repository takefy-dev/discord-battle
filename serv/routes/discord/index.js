const router = require('express').Router(),
  passport = require('passport')

router.get('/login', passport.authenticate('discord'))

router.get('/redirect', passport.authenticate('discord'), async (req, res) => {
  res.redirect('http://localhost:8080/')
})
router.get('/users', async (req, res) => {
  if (req.user) {
    res.status(200).json(req.user)
  } else {
    res.status(404).json({ message: 'Unauthorized' })
  }
})
router.get('/users/:id', async (req, res) => {
  try {
    let user = req.user || await global.database.database.models.users.findOne({ where: { discordId: req.params.id } })
    console.log(user)
    if (!user) return res.status(404).json({ message: 'Not found' })
    return res.status(200).json(user)
  } catch (e) {
    console.log(e)
    return res.status(500).json({error: e})
  }
})
module.exports = router
