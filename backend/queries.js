const Pool = require('pg').Pool
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'notatechdatabase',
	password: 'costa',
	port: 5432,
})

const create_user = (request, response) => {
	const { email, first_name, last_name, password, phone } = request.body

	pool.query('INSERT INTO users (email, first_name, last_name, password, phone) VALUES ($1, $2, $3, $4, $5)', [email, first_name, last_name, hash_password(password), phone], (error, results) => {
		if (error)
		{
			response.status(500).send(error)
		}
		else
		{
			response.status(201).send(`User added with email: ${email}`)
		}
	})
}

const auth_user = (request, response) => {
	const { email, password } = request.body

	pool.query('SELECT password from users where email=$1', [email], (error, results) => {
		if (error)
		{
			response.status(500).send(error)
		}
		else if (true)
		{
			// pass_hash = hash_password(password)
			check_password(results.rows[0], password)
			create_token().then((token) => {
				console.log(token)
				pool.query('UPDATE users set token=$1 where email=$2', [token, email], (internal_error, internal_results) => { if (error) { throw error }})
				response.status(200).send(`${token}`) 
			})
		}
		else
		{
			response.status(401).send()
		}
	})
}

const create_post = (request, response) => {
	const { token, title, caption, file } = request.body

	pool.query('SELECT * from users where token=$1', [token], (error, results) => {
		if (error)
		{
			response.status(500).send(error)
		}
		else if (results.rows.length > 0)
		{
			pool.query('INSERT INTO posts (owner_id, title, caption, media)', [ID, title, caption, media], (error, results) => {
				if (error)
				{
					response.status(500).send(error)
				}
				else
				{
					response.status(201).send()
				}
			})
		}
		else
		{
			response.status(401).send()
		}
	})
}

module.exports = {
	create_user,
	auth_user,
	create_post
}

const hash_password = (password) => {
  return new Promise((resolve, reject) =>
    bcrypt.hash(password, 10, (err, hash) => {
      err ? reject(err) : resolve(hash)
    })
  )
}

const check_password = (req_password, hashed_password) => {
  return new Promise((resolve, reject) =>
    bcrypt.compare(req_password, hashed_password, (err, result) => {
        if (err) {
          reject(err)
        }
        else if (result) {
          resolve(result)
        } else {
          reject(new Error('Passwords do not match.'))
        }
    })
  )
}

const create_token = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, data) => {
      err ? reject(err) : resolve(data.toString('base64'))
    })
  })
}
