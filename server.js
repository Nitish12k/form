const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON and urlencoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Route for the form submission
app.post('/submit-form', (req, res) => {
  const formData = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sharmanitish183@gmail.com',
      pass: 'ixdd ropy tmmn vsap'
    }
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'sharmanitish183@gmail.com',
    subject: 'New Form Submission',
    text: `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
    replyTo: formData.email
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error while sending email.');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Form submitted successfully!');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
