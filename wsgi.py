import web

from urls import url_pattern
from stats import get_current_cpu_usage, get_current_memory_usage
from books import get_book_list, add_book, delete_book

app = web.application(url_pattern, globals())
render = web.template.render('templates/', base='base')

class performance:
    '''
    View to render performance page
    '''
    def GET(self):
        return render.performance("Demo Project", "Server Performance", "")

class memory_stats():
    '''
    View to get Memory stats in JSON format
    '''
    def GET(self):
        web.header('Content-Type', 'application/json')
        return get_current_memory_usage()

class cpu_stats():
    '''
    View to get CPU stats in JSON format
    '''
    def GET(self):
        web.header('Content-Type', 'application/json')
        return get_current_cpu_usage()

class book_library():
    '''
    View to load book library page
    '''
    def GET(self):
        return render.book_library("Demo Project", "Book Library", "")

class book_list():
    '''
    View to handle REST calls to book library API's
    '''
    def GET(self, name):
        return get_book_list()

    def POST(self, name):
        if name:
            return add_book(name)
        else:
            raise web.badrequest()

    def DELETE(self, name):
        if name:
            delete_book(name)
        else:
            raise web.badrequest()

if __name__ == "__main__":    
    app.run()
