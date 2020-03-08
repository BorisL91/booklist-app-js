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
    const storedBooks = [
      {
        title: "Book One",
        author: "John Doe",
        isbn: "12335634"
      },
      {
        title: "Book Two",
        author: "John Doe",
        isbn: "123356674"
      }
    ]

    const books = storedBooks
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
  }

  static showAlert(message, className) {
    const div = document.createElement("div")
    div.className = `alert alert-${className}`
    div.appendChild(document.createTextNode(message))
    const container = document.querySelector(".container")
    const form = document.querySelector("#book-form")
    container.insertBefore(div, form)
  }

  static clearFields() {
    document.forms["book-form"].reset()
  }
}

// Store Class: Handles Storage

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
      //Clear fields
      UI.clearFields()
    }
  })

//Event: Remove Book
document.querySelector("#book-list").addEventListener("click", e => {
  UI.deleteBook(e.target)
})
