import connectDB from '@/config/database';
import User from '@/models/User';
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');

export const POST = async (req) => {
  try {
    await connectDB();
    const formData = await req.formData(); // Correct way to parse JSON body

    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      return new Response(
        JSON.stringify({
          message: 'All fields Are Required',
          success: false,
        }),
        { status: 403 }
      );
    }
    let user = await User.find({ email });

    user = user[0];

    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'No User Exist',
        }),
        { status: 401 }
      );
    }

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      user.token = token;
      user.password = undefined;

      return new Response(
        JSON.stringify({
          success: true,
          message: 'User Logged In',
          user,
        }),
        {
          status: 200,
          headers: {
            'Set-Cookie': `token=${token}; HttpOnly; Max-Age=${
              3 * 24 * 60 * 60
            }`,
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          message: 'Wrong Password',
          success: false,
        }),
        { status: 401 }
      );
    }
  } catch (err) {
    // console.error(err.message);
    return new Response(
      JSON.stringify({
        message: 'Login Failure',
        success: false,
      }),
      { status: 500 }
    );
  }
};
