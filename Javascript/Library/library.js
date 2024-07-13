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

function addBookToLibrary(title, author, pages, read = false) {
    myLibrary[myLibrary.length] = new Book(title, author, pages, read)
}

function displayBooks() {
    const library = document.querySelector("#library");
    library.innerHTML = "";

    for (let i = 0; i < myLibrary.length; i++) {
        const card = document.createElement("div");
        card.className = "bookCard";

        const title = document.createElement("h1");
        title.textContent = myLibrary[i].title;
        const author = document.createElement("h2");
        author.textContent = "By " + myLibrary[i].author;
        const pages = document.createElement("h3");
        pages.textContent = myLibrary[i].pages + " Pages";

        const buttons = document.createElement("div");
        buttons.className = "buttons";
        const read = document.createElement("button");
        read.className = "readButton";
        if (myLibrary[i].read === false) {
            read.textContent = "Not Read";
        }
        else {
            read.textContent = "Read";
        }
        const remove = document.createElement("button");
        remove.className = "remove";

        let bookContainer = card;

        read.addEventListener("click", function (event) {
            event.preventDefault();
            if (myLibrary[bookContainer.id].read === false) {
                myLibrary[bookContainer.id].read = true;
            }
            else {
                myLibrary[bookContainer.id].read = false;
            }
            changeReadButton(bookContainer.id, read);
        });

        remove.addEventListener("click", function (event) {
            event.preventDefault();
            myLibrary.splice(bookContainer.id, 1);
            console.log(bookContainer.id)
            bookContainer.remove();
            setIds();
        });

        buttons.appendChild(read);
        buttons.appendChild(remove);

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.append(buttons);

        library.append(card);
    }
    setIds();
}

function setIds() {
    const containers = document.querySelectorAll('.bookCard');
    for (let i = 0; i < myLibrary.length; i++) {
        containers[i].setAttribute('id', i);
    }
}

// TESTING addBookToLibrary() and displayBooks()

// const asd = new Book("asdd", "asdk", 123);
// console.log(asd.info())
addBookToLibrary("Zero to One: Notes on Startups, or How to Build the Future", "Peter Thiel", 224);
addBookToLibrary("Hunger Games", "Suzanne Collins", 374);

displayBooks();

// BOOK CARD BUTTON FUNCTIONS

function changeReadButton(i, bookRead) {
    if (myLibrary[i].read === false) {
        bookRead.textContent = 'Not Read';
        // bookRead.setAttribute('class', 'not-read')
    }
    else {
        bookRead.textContent = 'Read';
        // bookRead.setAttribute('class', 'read')
    }
}

// NEW BOOK BUTTON

function showForm() {
    document.getElementById('popUp').style.display = 'block';
    document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
}

function closeForm() {
    document.getElementById('popUp').style.display = 'none';
    document.body.style.backgroundColor = "black";
}

function createNewBook() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#page').value;
    const read = document.querySelector('#read').checked;

    if (read === true || read === false) {
        addBookToLibrary(title, author, pages, read);
    }
    else {
        addBookToLibrary(title, author, pages);
    }

    displayBooks();
    closeForm()

    document.querySelector('title').value = '';
    document.querySelector('author').value = '';
    document.querySelector('page').value = '';
    document.querySelector('read').checked = false;

    console.clear();
    console.log(myLibrary);
}

const createBook = document.querySelector("#submit");
createBook.addEventListener("click", function (event) {
    event.preventDefault();
    createNewBook();
});

