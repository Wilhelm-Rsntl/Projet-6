const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();
const port = 3000;

app.use(express.json());

// Route de base
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Route pour obtenir tous les utilisateurs
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

// Route pour créer un utilisateur
app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
        },
    });
    res.json(newUser);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
