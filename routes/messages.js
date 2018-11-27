const express = require('express');
const router = express.Router();

// libs
const Messages = require('../src/lib/Messages');

router.get('/list', (req, res, next) => {
    const roomid = req.query.roomId;

    setTimeout(() => {
        Messages.list(roomid, messages => {
            res.json(messages);
        });
    },100);
});

module.exports = router;