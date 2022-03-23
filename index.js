const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config()
const PORT = process.env.PORT || 5003

const app = express();
app.use(bodyParser.json());


app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected': 'approved';

        await axios.post('http://event-bus-srv:4005/events', {
            type: "CommentModerated",
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        })
    }

    res.send({});
});

app.listen(PORT, () => {
    console.log(`moderation app is running on port ${PORT}`)
})
