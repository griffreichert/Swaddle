from flask import Flask, Blueprint, request, json
from flask_restful import Api, Resource, url_for
import psycopg2, bcrypt, secrets, base64


connection = psycopg2.connect(user = "postgres",
								password = "costa",
								host = "localhost",
								port = "5432",
								database = "notatechdatabase")

# Print PostgreSQL Connection properties
print (connection.get_dsn_parameters(),"\n")


app = Flask(__name__)
api_bp = Blueprint('api', __name__)
api = Api(api_bp)


class base_page(Resource):
	def get(self):
		return {'response' : 'Hello, World!'}


class create_user(Resource):
	def post(self):
		data = request.json
		email = data['email']
		first = data['first_name']
		last = data['last_name']
		password = data['password']

		salt = bcrypt.gensalt()
		hashed = bcrypt.hashpw(password.encode('utf8'), salt)
		hashed = hashed.decode('utf8')

		cursor = connection.cursor()
		command = ("""insert into users (email, first_name, last_name, 
					password, due_date, avatar) VALUES 
					('%s', '%s', '%s', '%s', '', '')"""
					% (email,first, last, hashed))
		cursor.execute(command)
		connection.commit()
		return {'response' : 'Created user'}


class auth_user(Resource):
	def put(self):
		data = request.json
		email = data['email']
		password = data['password']

		cursor = connection.cursor()
		command = ("""select password from users 
					where email='%s'""" % email)
		cursor.execute(command)
		record = cursor.fetchone()

		# return unauthorized if email does not exist
		if record is None: return ({'response' : 'Unauthorized'}, 401)

		auth = (bcrypt.checkpw(password.encode('utf8'),
								record[0].encode('utf8')))
		token = ''

		if auth:
			# create session token for user
			token = secrets.token_urlsafe()
			cursor = connection.cursor()
			command = ("""update users set token = '%s' 
						where email='%s'""" % (token, email))
			cursor.execute(command)
			connection.commit()

			return ({'response' : auth, 'token' : token}, 200)

		else: return ({'response' : 'Unauthorized'}, 401)


class logout(Resource):
	def put(self):
		headers = request.headers
		# print(headers)
		token = headers['token']
		# print(token)

		cursor = connection.cursor()
		command = ("""update users set token='' where token = '%s'""" % 
					(token))
		cursor.execute(command)
		connection.commit()

		return ({'response' : 'Signed out user'}, 200)


class create_post(Resource):
	def post(self):
		data = request.json
		headers = request.headers
		token = headers['token']
		title = data['title']
		caption = data['caption']
		media = data['media']
		post_type = data['post_type']
		shared_with = data['shared_with']
		tags = data['tags']

		# print(tags)
		tag_array = ''
		for i in range(len(tags)):
			tag_array += ("'%s'" % tags[i])
			if i < (len(tags) - 1): tag_array += ", "
		# print(tag_array)

		# authenticate token
		cursor = connection.cursor()
		command = ("""select user_id from users 
					where token='%s'""" % token)
		cursor.execute(command)
		record = cursor.fetchone()

		if record is None: return ({'response' : 'Unauthorized'}, 401)
		auth = len(record)

		if auth:
			# create post
			user_id = record[0]
			# print(user_id)
			cursor = connection.cursor()
			command = ("""insert into posts (owner_id, title, caption, 
						media, post_type, tags) values 
						(%s, '%s', '%s', '%s', '%s', ARRAY [%s])""" % 
						(user_id, title, caption, media, 
							post_type, tag_array))
			cursor.execute(command)
			connection.commit()
			return {'response' : 'Created post'}

		else: return ({'response' : 'Unauthorized'}, 401)



class load_posts(Resource):
	def get(self):
		headers = request.headers
		token = headers['token']

		# authenticate token
		cursor = connection.cursor()
		command = ("""select user_id from users 
					where token='%s'""" % token)
		cursor.execute(command)
		record = cursor.fetchone()

		# return unauthorized if email does not exist
		if record is None: return ({'response' : 'Unauthorized'}, 401)
		auth = len(record)

		if auth:
			# create post
			user_id = record[0]
			# print(user_id)
			cursor = connection.cursor()
			command = ("""select post_id, title, caption, media, 
						post_type, tags, created_date from posts 
						where owner_id=%s""" % (user_id))
			cursor.execute(command)
			record = cursor.fetchall()

			posts = []
			for i in record:
				post = {
					"id": str(i[0]),
					"title": i[1],
					"caption": i[2],
					"media": bytes(i[3]).decode('ascii'),
					"post_type": i[4],
					"tags": i[5],
					"timestamp": str(i[6])
				}
				posts.append(post)

			response = {'response' : 'Loaded posts', 'data': posts}
			
			return (response, 200)

		else: return ({'response' : 'Unauthorized'}, 401)


class load_profile(Resource):
	def get(self):
		headers = request.headers
		token = headers['token']

		# authenticate token
		cursor = connection.cursor()
		command = ("""select user_id from users 
					where token='%s'""" % token)
		cursor.execute(command)
		record = cursor.fetchone()

		# return unauthorized if email does not exist
		if record is None: return ({'response' : 'Unauthorized'}, 401)
		auth = len(record)

		if auth:
			user_id = record[0]
			cursor = connection.cursor()
			command = ("""select email, first_name, last_name, due_date, 
						avatar from users where user_id=%s""" % (user_id))
			cursor.execute(command)
			record = cursor.fetchone()

			post = {
				"email": record[0],
				"first_name": record[1],
				"last_name": record[2],
				"due_date": record[3],
				"avatar": bytes(record[4]).decode('ascii')
			}

			response = {'response' : 'Loaded profile', 'data': post}
			
			return (response, 200)

		else: return ({'response' : 'Unauthorized'}, 401)


class update_profile(Resource):
	def put(self):
		data = request.json
		headers = request.headers
		token = headers['token']
		email = data['email']
		first = data['first_name']
		last = data['last_name']
		due_date = data['due_date']
		avatar = data['avatar']

		# authenticate token
		cursor = connection.cursor()
		command = ("""select user_id from users 
					where token='%s'""" % token)
		cursor.execute(command)
		record = cursor.fetchone()

		# return unauthorized if email does not exist
		if record is None: return ({'response' : 'Unauthorized'}, 401)
		auth = len(record)

		if auth:
			user_id = record[0]
			cursor = connection.cursor()
			command = ("""update users set email='%s', first_name='%s', 
						last_name='%s', due_date='%s', avatar='%s' 
						where user_id=%s""" % (email, first, 
							last, due_date, avatar, user_id))
			cursor.execute(command)
			connection.commit()
			return ({'response' : 'Updated profile'}, 200)

		else: return ({'response' : 'Unauthorized'}, 401)


class change_due_date(Resource):
	def put(self):
		data = request.json
		headers = request.headers
		token = headers['token']
		due_date = data['due_date']

		# authenticate token
		cursor = connection.cursor()
		command = ("""select user_id from users 
					where token='%s'""" % token)
		cursor.execute(command)
		record = cursor.fetchone()

		# return unauthorized if email does not exist
		if record is None: return ({'response' : 'Unauthorized'}, 401)
		auth = len(record)

		if auth:
			user_id = record[0]
			cursor = connection.cursor()
			command = ("""update users set due_date='%s'
						where user_id=%s""" % (due_date, user_id))
			cursor.execute(command)
			connection.commit()
			return ({'response' : 'Changed due date'}, 200)

		else: return ({'response' : 'Unauthorized'}, 401)


class load_contacts(Resource):
	def get(self):
		headers = request.headers
		token = headers['token']

		# authenticate token
		cursor = connection.cursor()
		command = ("""select user_id from users 
					where token='%s'""" % token)
		cursor.execute(command)
		record = cursor.fetchone()

		# return unauthorized if email does not exist
		if record is None: return ({'response' : 'Unauthorized'}, 401)
		auth = len(record)

		if auth:
			# create post
			user_id = record[0]
			cursor = connection.cursor()
			command = ("""select users.user_id, first_name, last_name, 
						avatar from users left join contacts on 
						contact_id=users.user_id where 
						contacts.user_id=%s""" % (user_id))
			cursor.execute(command)
			record = cursor.fetchall()

			contacts = []
			for i in record:
				contact = {
					"id": str(i[0]),
					"first_name": i[1],
					"last_name": i[2],
					"avatar": bytes(i[3]).decode('ascii')
				}
				contacts.append(contact)

			response = {'response' : 'Loaded contacts', 'data': contacts}
			
			return (response, 200)

		else: return ({'response' : 'Unauthorized'}, 401)



api.add_resource(base_page, '/')
api.add_resource(create_user, '/create_user')
api.add_resource(auth_user, '/auth_user')
api.add_resource(logout, '/logout')
api.add_resource(create_post, '/create_post')
api.add_resource(load_posts, '/load_posts')
api.add_resource(load_profile, '/load_profile')
api.add_resource(update_profile, '/update_profile')
api.add_resource(change_due_date, '/change_due_date')
api.add_resource(load_contacts, '/load_contacts')
app.register_blueprint(api_bp)


if __name__ == '__main__':
	app.run(debug=True, host='192.168.112.101')