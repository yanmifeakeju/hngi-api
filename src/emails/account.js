const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'yanmifeakeju@gmail.com',
    subject: 'Thanks for joining us',
    text: `Welcome to the app, ${name}. let me know how you get along with the app.`,
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'yanmifeakeju@gmail.com',
    subject: 'Sorry to See You Go',
    text: `Goodbye, ${name}. We hope to have you  back soon`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
// const msg = {
//   to: 'akejuoladimeji@gmail.com',
//   from: 'yanmifeakeju@gmail.com',
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail
//   .send(msg)
//   .then(() => console.log(msg))
//   .catch((error) => console.log(error.response.body));

// sgMail.send({
//   to: 'yanmifeakeju@gmail.com',
//   from: 'yanmifeakeju@gmail.com',
//   subject: 'first user',
//   text: 'I hope this one reaches you',
// }).then(() => conso)
// sgMail.send(msg).then(() => {
//     console.log('Message sent')
// }).catch((error) => {
//     console.log(error.response.body)
