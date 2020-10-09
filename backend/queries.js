const Pool = require('pg').Pool
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'notatechdatabase',
  password: 'password',
  port: 5432,
})

const create_user = (request, response) => {
  const { email, first_name, last_name, password, phone } = request.body

  pool.query('INSERT INTO users (email, first_name, last_name, password, phone) VALUES ($1, $2, $3, $4, $5)', [email, first_name, last_name, password, phone], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}

module.exports = {
  create_user
}

