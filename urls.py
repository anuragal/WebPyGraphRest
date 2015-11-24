url_pattern = (
    '/', 'performance',
    '/performance', 'performance',
    '/memory_stats', 'memory_stats',
    '/cpu_stats', 'cpu_stats',
    
    '/book_library', 'book_library',
    '/book_list(?:/(?P<name>[a-zA-Z0-9_ ]+))?', 'book_list',
)