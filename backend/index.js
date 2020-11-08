function run()
{
	const express = require('express')
	const bodyParser = require('body-parser')

	const db = require('./queries')

	const app = express()
	const port = 3000

	app.use(bodyParser.json())
	app.use(
	  bodyParser.urlencoded({
	    extended: true,
	  })
	)

	app.get('/', (request, response) => {
	  response.json({ info: 'Node.js, Express, and Postgres API' })
	})

	app.post('/create_user', db.create_user)

	app.put('/auth_user', db.auth_user)

	app.listen(port, () => {
	  console.log(`App running on port ${port}.`)
	})
}

try
{
	run()
}
catch (e)
{
	console.log(e)
	run()
}
