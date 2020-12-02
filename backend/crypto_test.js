const bcrypt = require('bcrypt')
const crypto = require('crypto')

const create_token = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, data) => {
      err ? reject(err) : resolve(data.toString('base64'))
    })
  })
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

create_token().then(console.log)


// const match = async(pass_hash) => {
// 	await bcrypt.compare(pass_hash, pass_hash)

password = 'password'
hash_password(password).then((pass_hash) => bcrypt.compare(pass_hash, pass_hash)).then(console.log)
