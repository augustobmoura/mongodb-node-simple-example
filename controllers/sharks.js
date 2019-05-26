const path = require('path');
const Shark = require('../models/shark');

exports.index = (req, res) => {
    res.sendFile(path.resolve('views/sharks.html'));
};

exports.create = (req, res) => {
    const newShark = new Shark(req.body);
    console.log('new-shark', req.body);
    newShark.save((err) => {
        if (err) {
            res.status(400)
                .send('Unable to save shark tp database');
        } else {
            res.redirect('/sharks/getshark');
        }
    });
};

exports.list = (req, res) => {
    Shark.find({}).exec((err, sharks) => {
        if (err) {
            return res.send(500, err);
        }
        res.render('getshark', {
            sharks,
        });
    });
};
