const mailSender = require('@/utils/mailSender');
const otpTemplate = require('@/mail/templates/emailVerificationTemplate');
require('dotenv').config();

import { Schema, model, models } from 'mongoose';

const OTPSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 60 * 5,
  },
});

const OTP = models.OTP || model('OTP', OTPSchema);

async function sendVerificationEmail(email, otp) {
  try {
    const link = process.env.FRONTEND_LINK;
    let info = await mailSender(
      email,
      'Verification Mail from Property Pulse',
      otpTemplate(otp, link)
    );
    console.log(info);
  } catch (err) {
    console.error(err);
  }
}

OTPSchema.pre('save', async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

export default OTP;
