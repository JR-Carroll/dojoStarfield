from twisted.web.server import Site
from twisted.web.static import File
from twisted.internet import reactor

resource = File(".")
factory = Site(resource)
reactor.listenTCP(8082, factory)
reactor.run()
