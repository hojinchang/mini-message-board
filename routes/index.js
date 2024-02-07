var express = require('express');
var router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true, // Use 24-hour format
  };

  return date.toLocaleString('en-US', options);
}

messages.forEach(message => {
  message.added = formatDate(message.added);
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mini Message Board', messages: messages });
});

router.get('/new', function(req, res, next) {
  res.render('form', { title: "New Message" });
});

// Post request from the form
router.post('/new', function(req, res) {
  // Get the form inputs
  const name = req.body.username;
  const message = req.body.message;
  const added = formatDate(new Date());

  // Push the new message into message array
  message.push({
    text: message,
    user: name,
    added: added
  });

  // Send the user back to index.js
  res.redirect("/"); 
})

module.exports = router;
