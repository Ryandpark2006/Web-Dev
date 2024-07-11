const myLibrary = [];

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        let information = this.title + "by " + this.author + ", " + pages + " pages, ";
        if (this.read === false) {
            information += "not ";
        }
        information += "read yet";
        return information;
    };
}

// const asd = new Book("asdd", "asdk", 123);
// console.log(asd.info())

function addBookToLibrary(title, author, pages, read) {
    myLibrary[myLibrary.length] = new Book(title, author, pages, read)
}

function displayBooks() {
    for (let i = 0; i < myLibrary.length; i++) {

    }
}