const express = require('express');
const { register, login } = require('../controllers/user');
const mapUser = require('../helpers/mapUser');

const router = express.Router({mergeParams: true});

router.post('/register', async (req, res) => {
    try {
        const { login, password } = req.body;
        const { user, token } = await register(login, password);

        res.cookie('token', token, { httpOnly: true })
            .send({ error: null, user: mapUser(user) });
            
    } catch (e) {
        res.send({ error: e.message || "Unknown error" })
    }
});

router.post('/login', async (req, res) => {
    try {
        const { login: loginUser, password } = req.body;
        const { user, token } = await login(loginUser, password);

        res.cookie('token', token, { httpOnly: true })
            .send({ error: null, user: mapUser(user) });
    } catch (e) {
        res.send({ error: e.message || "Unknown error" })
    }
});

router.post('/logout', (req, res) => {
    res.cookie('token', '', { httpOnly: true })
        .send({});
});

module.exports = router;