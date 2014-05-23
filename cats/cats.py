import urllib
import BaseHTTPServer


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

    inputUrl = s.path[6:]
    print "############"
    print inputUrl
    print "############"

    json = urllib.urlopen(inputUrl).read()
    s.wfile.write(json)

server_address = ('localhost', 8000)
httpd = BaseHTTPServer.HTTPServer(server_address, MyHandler)
while True:
  httpd.handle_request()
