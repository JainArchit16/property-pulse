const otpTemplate = (otp, link) => {
  return `<!DOCTYPE html>
      <html>
      
      <head>
          <meta charset="UTF-8">
          <title>OTP Verification Email</title>
          <style>
              body {
                  background-color: #ffffff;
                  font-family: Arial, sans-serif;
                  font-size: 16px;
                  line-height: 1.4;
                  color: #333333;
                  margin: 0;
                  padding: 0;
              }
      
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  text-align: center;
              }
      
              .logo {
                  max-width: 120px;
                  margin-bottom: 20px;
              }
      
              .message {
                  font-size: 18px;
                  font-weight: bold;
                  margin-bottom: 20px;
              }
      
              .body {
                  font-size: 16px;
                  margin-bottom: 20px;
              }
      
              .cta {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #FFD60A;
                  color: #000000;
                  text-decoration: none;
                  border-radius: 5px;
                  font-size: 16px;
                  font-weight: bold;
                  margin-top: 20px;
              }
      
              .support {
                  font-size: 14px;
                  color: #999999;
                  margin-top: 20px;
              }
      
              .highlight {
                  font-weight: bold;
              }
          </style>
      
      </head>
      
      <body>
          <div class="container">
              <a href=${link}>
                      <img className='h-10 w-auto logo' src="https://i.ibb.co/Kx4Xd1y/logo.png" alt='PropertyPulse' />
          </a>
              <div class="message">OTP Verification Email</div>
              <div class="body">
                  <p>Dear User,</p>
                  <p>Thank you for registering with PropertyPulse. To complete your registration, please use the following OTP
                      (One-Time Password) to verify your account:</p>
                  <h2 class="highlight">${otp}</h2>
                  <p>This OTP is valid for 5 minutes. If you did not request this verification, please disregard this email.
                  Once your account is verified, you will have access to our platform and its features.</p>
              </div>
              <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
                      href="mailto:info@propertyPulse.com">info@propertyPulse.com</a>. We are here to help!</div>
          </div>
      </body>
      
      </html>`;
};
module.exports = otpTemplate;
