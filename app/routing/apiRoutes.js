const friends = require('../data/friends');
const questions = require('../data/questions');

module.exports = (app) => {
    app.get('/api/friends', (req, res) => {
        res.json(friends);
    });

    app.post('/api/friends', (req, res) => {
        friends.push(req.body);
        res.json(true);
    });

    app.get('/api/questions', (req, res) => {
        res.json(questions);
    });
};