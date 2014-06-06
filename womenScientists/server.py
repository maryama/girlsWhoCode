import BaseHTTPServer
import json
import random
import string
import urllib
import wikipedia


class MyHandler(BaseHTTPServer.BaseHTTPRequestHandler):
  def do_HEAD(s):
    print "processing head request..."
    s.send_response(200)
    s.send_header("Content-type", "application/json")
    s.send_header("Access-Control-Allow-Origin", "*")
    s.end_headers()

  def do_GET(s):
    """Respond to a GET request."""
    print "processing get request..."
    s.send_response(200)
    s.send_header("Content-type", "application/json")
    s.send_header("Access-Control-Allow-Origin", "*")
    s.end_headers()

    inputUrl = s.path

    print "####INPUT########"
    print inputUrl
    print "#####INPUT#######"

    try:
      index = string.index(inputUrl, "url=") + 4
      urlParam = inputUrl[index:]
      print "url request: " + urlParam
      response = urllib.urlopen(urlParam).read()
      s.wfile.write(response)
    except:
      print "no url specified"

    try:
      index = string.index(inputUrl, "random") + 6
      randomParam = inputUrl[index:]
      scientists = open("women_scientists.txt", 'r').readlines()
      size = len(scientists)
      fileIndex = random.randint(0, size)
      scientist = scientists[fileIndex]
      print "random request returning: " + scientist
      response = json.dumps(scientist)
      s.wfile.write(response)

    except:
      print "no female scientist requested"

    try:
      index = string.index(inputUrl, "wiki=") + 5
      scientistParam = inputUrl[index:]
      scientist = ' '.join(scientistParam.split("%20"))
      print "wiki request for " + scientist
      page = wikipedia.page(scientist)
      summary = page.summary
      response = json.dumps(summary)
      s.wfile.write(response)
    except:
      print "no wiki request"

server_address = ('localhost', 8000)
httpd = BaseHTTPServer.HTTPServer(server_address, MyHandler)
while True:
  httpd.handle_request()
