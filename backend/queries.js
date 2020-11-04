const Pool = require('pg').Pool
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'notatechapp',
	password: 'costa',
	port: 5432,
})

const create_user = (request, response) => {
	const { email, first_name, last_name, password, phone } = request.body

	pool.query('INSERT INTO users (email, first_name, last_name, password, phone) VALUES ($1, $2, $3, $4, $5)', [email, first_name, last_name, hash_password(password), phone], (error, results) => {
		if (error) { throw error }
		response.status(201).send(`User added with email: ${email}`)
	})
}

const auth_user = (request, response) => {
	const { email, password } = request.body

	pool.query('SELECT password from users where email=$1', [email], (error, results) => {
		if (error)
		{
			throw error
		}
		if (check_password(results.rows[0], hash_password(password)))
		{
			token = create_token()
			pool.query('UPDATE users set token=$1 where email=$2', [token, email], (internal_error, internal_results) => { if (error) { throw error }})
		}
		else
		{
			response.status(401).send()
		}
		response.status(200).send(`${token}`)
	})
}

module.exports = {
	create_user,
	auth_user
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
