from ast import literal_eval as make_tuple
from flask import Flask, Blueprint, request, json
import os, traceback, datetime
from flask_restful import Resource, Api
from io import BytesIO


class base_page(Resource):
	def post(self):
		try:
			status = 200
			resp = { "Welcome to 'Not a Tech App'!"}
			return (resp, status, {"Content-type": "application/vnd.api+json"})
		except:
			# save any runtime errors to the log file
			self.log('RUNTIME ERROR: ------------------------')
			self.log(traceback.format_exc())
			return self.error('Runtime error', 'Check log for details')

	def log(self, entry):
		fd = open(self.directory + 'server.log', 'a')
		# open the log file
		fd.write(self.time() + str(entry) + '\n')
		# write the entry to the log with a time marker
		fd.close()
		# close the file

# FLASK:

blueprint = Blueprint('api', __name__)

api = Api(blueprint, prefix="/api")
api.add_resource(base_page, "/base")

app = Flask(__name__)
app.register_blueprint(blueprint)

if __name__ == '__main__':
	app.run(debug=True)