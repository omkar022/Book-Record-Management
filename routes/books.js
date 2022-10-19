const express = require("express");

const { books } = require("../data/books.json")
const { users } = require("../data/users.json")
const router = express.Router();

router.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        data: books,
    })
})
router.get('/issued/by-user', (req, res) => {
    const usersWithIssuedBooks = users.filter((each) => {
        if (each.issuedBook) return each;
    });
    const issuedBooks = [];
    usersWithIssuedBooks.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook);
        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;
        issuedBooks.push(book);
    });
    if (issuedBooks.length === 0)
        return res.status(404).json({
            success: false,
            message: "No Books Issued yet",
        });

    return res.status(200).json({
        success: true,
        data: issuedBooks,



    })

});

router.get('/:id', (req, res) => {
    const { id } = req.params
    const book = books.find((each) => each.id === id);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found",

        });
    }
    return res.status(200).json({
        success: true,
        data: book,
    });

});
router.post('/', (req, res) => {
    const { id, name, author, genre, price, publisher } = req.body;
    const book = books.find((each) => each.id === id);
    if (book) {
        return res.status(404).json({
            success: false,
            message: "Book Exist with this id",

        });
    }
    books.push({
        id, name, author, genre, price, publisher,
    });
    return res.status(201).json({
        success: true,
        data: books,
    })
});
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const book = books.find((each) => each.id === id);

    if (!book)
        return res.status(404).json({ success: false, message: "Book Not Found" });

    const updatedBook = books.map((each) => {
        if (each.id === id) {
            return {
                ...each,
                ...data,
            };
        }
        return each;
    });
    return res.status(200).json({
        success: true,
        data: updatedBook,
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const book = books.find((each) => each.id === id);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book to be deleted was not found",

        });
    }
    const index = books.indexOf(book);
    books.splice(index, 1);
    return res.status(202).json({
        success: true,
        data: books
    });
});


























module.exports = router;