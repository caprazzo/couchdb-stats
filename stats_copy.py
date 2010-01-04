import httplib
import time
from datetime import datetime
import threading
import sys
import simplejson as json

class Couch:
	"""Basic wrapper class for operations on a couchDB"""
	def __init__(self, host, port=5984, options=None):
		self.host = host
		self.port = port

	def connect(self):
		return httplib.HTTPConnection(self.host, self.port) # No close()
		
	def put(self, uri, body):
		c = self.connect()
		headers = {"Content-type": "application/json"}
		c.request("PUT", uri, body, headers)
		return c.getresponse()

	def stats(self, range):
		c = self.connect()
		c.request("GET","/_stats?range=%s" % range, "",{})
		return c.getresponse()

source_srv = Couch(sys.argv[1])
target_srv = Couch(sys.argv[2])
target_db = sys.argv[3]
# beware couchdb only supports fixed delays of 60, 300 and 900
# anything else will not work
delay = int(sys.argv[4])

def stats(delay):
	stats = json.loads(source_srv.stats(delay).read())
	now = datetime.now()
	# this format can be parsed by javascript's `new Date(str)`
	jsonDate = now.strftime("%Y/%m/%d %H:%M:%S +0000")
	stats['timestamp'] = jsonDate
	path = '/%s/stats-%s' % (target_db, now.strftime("%Y-%m-%d-%H%M%S"))
	print target_srv.put(path, json.dumps(stats)).read()

while True:
	threading.Thread(target=stats, args=[delay]).start()
	time.sleep(delay)

