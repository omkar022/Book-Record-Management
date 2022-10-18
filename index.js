const e = require("express");
const express = require("express");

const { users } = require('./data/users.json');

const app = express();

const PORT = 8081;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Server is up and running",
    });
});

app.get('/users', (req, res) => {
    res.status(200).json({
        success: true,
        data: users,


    });
});

app.get('/users/:id', (req, res) => {
    const { id } = req.params
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",

        });
    }
    return res.status(200).json({
        success: true,
        data: user,
    });

});

app.post('/users', (req, res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;
    const user = users.find((each) => each.id === id);
    if (user) {
        return res.status(404).json({
            success: false,
            message: "User Exist with this id",

        });
    }
    users.push({
        id, name, surname, email, subscriptionType, subscriptionDate,
    });
    return res.status(201).json({
        success: true,
        data: users,
    })
});



app.put('users/:id', (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const users = users.find((each) => each.id === id);

    if (!users)
        return res.status(404).json({ success: false, message: "User Not Found" });

    const updatedUsers = users.map((each) => {
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
        data: updatedUsers,
    });
});




app.get("*", (req, res) => {
    res.status(404).json({
        message: 'This route does not exist'
    });
});