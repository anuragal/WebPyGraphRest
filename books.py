import json
import psutil

#In memory book list
book_list = [   "Harry Potter and the Order of the Phoenix", 
                "To Kill a Mockingbird",
                "Pride and Prejudice",
                "Gone with the Wind"]

def get_book_list():
    '''
    Function to return the book list in JSON format
    '''
    return json.dumps(book_list)

def delete_book(name):
    '''
    Function to delete a book from list
    based on passed book name
    '''
    if name in book_list:
        book_list.remove(name.strip())
    return True

def add_book(name):
    '''
    Function to add new book
    '''
    if name not in book_list:
        book_list.append(name.strip())
    return True
