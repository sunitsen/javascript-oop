
//Book class Represent a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }
}

//UI Class: Handel UI Tasks

class UI {

    //Display Book
    static displayBooks() {
       const books = Store.getBooks();

        // dummy data make  ( use if need )
        // const StoreBooks = [
        //     {
        //         title: 'Book One',
        //         author: 'Jhon smith',
        //         isbn: '32384'
        //     },
        //     {
        //         title: 'Book One',
        //         author: 'Jhon smith',
        //         isbn: '32384'
        //     }
        // ];

        // const books = StoreBooks;
        books.forEach((book) => UI.addBookToList(book));

    }

    //Add Book List
    static addBookToList(book) {
      
        const list = document.querySelector('#book-list');
        const row = document.createElement("tr");

        row.innerHTML = `
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.isbn}</td>
         <td><a href="#" class="btn btn-danger delete" btn-sm>X</a></td>

        `;
        list.appendChild(row)
    }

    //Delete Book
    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    // show message 
    static showAlert(message, className) {
        const div = document.createElement("div");
        //create class
        div.className = `alert alert-${className}`;
        // create message
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        container.insertBefore(div, form);

        // set time out 
        setTimeout(() => document.querySelector('.alert').remove(), 2000)

    }



    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

}

//Store Class: Handel Store
class Store {
    //create arry for local store
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null){
        books = [];
      }else{
        books = JSON.parse(localStorage.getItem('books'));
      }
      return books;
    }


    //Add book in store
    static addBook(book) {
       const books = Store.getBooks();
       books.push(book)
       localStorage.setItem('books', JSON.stringify(books));
    }

    //Remove books using isbn
    static removeBook(isbn) {
     const books = Store.getBooks();
     books.forEach((book, index) =>{
        if(book.isbn === isbn){
           books.splice(index,1)
        }
     });

     localStorage.setItem('books', JSON.stringify(books));

    }
    
}


//Event: Display Book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
    e.preventDefault();
    //Get form values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    //form Validation
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('please fields in all fildes', 'danger');
    } else {
        //Instatiate book
        const book = new Book(title, author, isbn);

        //Add Book to UI
        UI.addBookToList(book)

        //Add Book to store
        Store.addBook(book)

        //show success messaeg
        UI.showAlert('Book Add', 'success')

        //Clear fileds
        UI.clearFields()

    }

});

//Event: Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) => {
    UI.deleteBook(e.target)


   //Remove book from UI
   Store.removeBook(e.target.parentElement.previousElementSibling.textContent);  // Added missing logic to remove book from store
   //Remobe Book from Store
   

    //show success messaeg
    UI.showAlert('Book Remove', 'success')

})