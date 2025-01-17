// Book Class: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title
    this.author = author
    this.isbn = isbn
  }
}
//UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks()
    books.forEach(book => UI.addBookToList(book))
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list")
    const row = document.createElement("tr")
    row.innerHTML = `
			<td>${book.title}</td>
			<td>${book.author}</td>
			<td>${book.isbn}</td>
			<td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
		`
    list.appendChild(row)
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove()
    }
    UI.showAlert("Book deleted!", "info")
  }

  static showAlert(message, className) {
    const div = document.createElement("div")
    //adds bootstrap class e.g alert-danger
    div.className = `alert alert-${className}`
    div.appendChild(document.createTextNode(message))
    const container = document.querySelector(".container")
    const form = document.querySelector("#book-form")
    container.insertBefore(div, form)
    //Vanish in 3s
    setTimeout(() => document.querySelector(".alert").remove(), 3000)
  }

  static clearFields() {
    document.forms["book-form"].reset()
  }
}

// Store Class: Handles Storage
class Store {
  static getBooks() {
    let books
    if (localStorage.getItem("books") === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem("books"))
    }
    return books
  }

  static addBook(book) {
    const books = Store.getBooks()
    books.push(book)
    localStorage.setItem("books", JSON.stringify(books))
  }

  static removeBook(isbn) {
    const books = Store.getBooks()
    books.forEach((book, index) => {
      books.splice(index, 1)
    })
    localStorage.setItem("books", JSON.stringify(books))
  }
}

//Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks)

//Event: Add Book
const form = document
  .querySelector("#book-form")
  .addEventListener("submit", e => {
    e.preventDefault()
    //get form values
    const title = document.querySelector("#title").value
    const author = document.querySelector("#author").value
    const isbn = document.querySelector("#isbn").value

    //Validation
    if (title === "" || author === "" || isbn === "") {
      UI.showAlert("Please fill in all fields", "danger")
    } else {
      //Instantiate Book
      const book = new Book(title, author, isbn)

      //Add book to UI
      UI.addBookToList(book)
      //Add book to Store
      Store.addBook(book)

      //Add success message
      UI.showAlert("Book added!", "success")
      //Clear fields
      UI.clearFields()
    }
  })

//Event: Remove Book
document.querySelector("#book-list").addEventListener("click", e => {
  UI.deleteBook(e.target)

  //remove book from storage
  Store.removeBook(e.target.parentElement.previousSibling.textContent)
})
