const nodemailer = require('nodemailer')

const emailHtml = name => {
  return `  
    <div style="margin-top: 3rem;
                max-width: 720px;
                min-width: 340px;
                width: 100%;
                padding-right: 15px;
                padding-left: 15px;
                margin-right: auto;
                margin-left: auto;">

      <div style="padding: 1.5rem;border: 1px solid #dee2e6;">
        <img src="https://static1.squarespace.com/static/5521bc3fe4b09ef0c7408c72/t/5841a00a893fc0ed460e0850/1480695852371/Kinky-Boots.jpg" alt="Avatar" width="300" style="padding-right: 1rem;
              border-radius: .25rem;
              vertical-align: middle;
              border-style: none;
              float: right;">

        <h5 class="text-uppercase" style="text-transform: uppercase;
                                          font-size: 1.25rem;
                                          margin-bottom: .5rem;
                                          font-family: inherit;
                                          font-weight: 500;
                                          line-height: 1.2;
                                          color: inherit;margin-top: 0;">
          ${name},
        </h5>
        <p style="margin-top: 0;
                  margin-bottom: 1rem;
                  display: block;
                  margin-block-start: 1em;
                  margin-block-end: 1em;
                  margin-inline-start: 0px;
                  margin-inline-end: 0px;">
                  
          You bought tickets from the official site!<br>Simply show the attached etickets on Email
          <br>
          You can even print your tickets out on your printer<br>Broadway's ®Kinky Boots
        </p>

        <div>
          <h6 style="font-size: 1rem;
                      margin-bottom: .5rem;
                      font-family: inherit;
                      font-weight: 500;
                      line-height: 1.2;
                      color: inherit; 
                      display: block;">
            Info
          </h6>
          <ul style="padding-left: 0;
                    list-style: none;
                    font-size: 80%;
                    font-weight: 400;
                    margin-top: 0;
                    margin-bottom: 1rem;
                    display: block;
                    margin-block-start: 1em;
                    margin-block-end: 1em;
                    margin-inline-start: 0px;
                    margin-inline-end: 0px;">
            <li style="display: list-item;
                      text-align: -webkit-match-parent;    
                      font-size: 80%;
                      font-weight: 400;">
                      Date: Fri 4th Jan
            </li>
            <li style="display: list-item;
                      text-align: -webkit-match-parent;
                      font-size: 80%;
                      font-weight: 400;">
            Location: 
              <a href="https://www.google.com/maps/place/Al+Hirschfeld+Theatre/@40.759261,-73.9913897,17z/data=!3m1!4b1!4m5!3m4!1s0x89c25854888f3595:0xac6d56c9266eb217!8m2!3d40.759261!4d-73.989201" style="color: #007bff;
                      text-decoration: none;
                      background-color: transparent;">
              Al Hirschfeld Theatre
              </a>
            </li>
          </ul>
          <ul style="padding-left: 0;
                    list-style: none;
                    font-size: 80%;
                    font-weight: 400;
                    margin-top: 0;
                    margin-bottom: 1rem;
                    display: block;
                    margin-block-start: 1em;
                    margin-block-end: 1em;
                    margin-inline-start: 0px;
                    margin-inline-end: 0px;">
            <h6 style="font-size: 1rem;
                        margin-bottom: .5rem;
                        font-family: inherit;
                        font-weight: 500;
                        line-height: 1.2;
                        color: inherit; 
                        display: block;">
              We're here to help
            </h6>
            <li style="display: list-item;
                      text-align: -webkit-match-parent;
                      font-size: 80%;
                      font-weight: 400;">
              Have a question?
                <a href="#" style="color: #007bff;text-decoration: none;background-color: transparent;">
                Search our FAQs
                </a>
              </li>
          </ul>
        </div>
      </div>
    <div style="isplay: block;clear: both;content: "";">...</div>
  </div>
`
}

// async..await is not allowed in global scope, must use a wrapper
// async function sendEmail(buyerData) {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   // let testAccount = await nodemailer.createTestAccount()
//   try {
//     const { name, email } = buyerData
//     console.log(buyerData)

//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: process.env.EMAIL_ACCOUNT, // generated ethereal user
//         pass: process.env.EMAIL_PASSWORD // generated ethereal password
//       }
//     })

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//       from: '"Kinky-Boots 👠" <Kinky-Boots@kb.com>', // sender address
//       to: email, // list of receivers
//       subject: `Hello ${name} 🎟️️`, // Subject line
//       html: emailHtml(name) // html body
//     })

//     console.log('Message sent: %s', info.messageId)
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     // Preview only available when sending through an Ethereal account
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//   } catch (error) {
//     console.log(error)
//   }
// }

const sgMail = require('@sendgrid/mail')

async function sendEmail(buyerData) {
  try {
    const { name, email } = buyerData
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: email,
      from: '"Kinky-Boots 👠" <Kinky-Boots@kb.com>',
      subject: `Hello ${name} 🎟️️`,
      html: emailHtml(name)
    }
    sgMail.send(msg)
    console.log('send OK')
  } catch (error) {
    console.log(error)
  }
}

module.exports = sendEmail
