import connectDB from '@/config/database';
import OTP from '@/models/OTP';
import User from '@/models/User';
const otpGenerator = require('otp-generator');

export const POST = async (req) => {
  try {
    await connectDB();

    const formData = await req.formData(); // Correct way to parse JSON body
    const email = formData.get('email');
    if (await User.findOne({ email })) {
      return new Response(
        JSON.stringify({
          message: 'User Already Exists',
          success: false,
        }),
        { status: 401 }
      );
    }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let result = await OTP.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp });
    }

    const otpPayload = { email, otp };

    await OTP.create(otpPayload);

    return new Response(
      JSON.stringify({
        message: 'OTP sent successfully',
        success: true,
        otp,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
      }),
      { status: 500 }
    );
  }
};
