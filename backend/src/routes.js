const express = require('express')

const SessionController = require('./controllers/SessionController')
const OngsController = require('./controllers/OngController')
const ProfileController = require('./controllers/ProfileController')
const IncidentController = require('./controllers/IncidentController')


const routes = express.Router()

routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngsController.index)
routes.post('/ongs', OngsController.create)
routes.delete('/ongs/:id', OngsController.delete)

routes.get('/profile', ProfileController.index)

routes.get('/incidents', IncidentController.index )
routes.post('/incidents', IncidentController.create)
routes.delete('/incidents/:id', IncidentController.delete)


module.exports = routes