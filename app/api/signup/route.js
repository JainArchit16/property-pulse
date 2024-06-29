import OTP from '@/models/OTP';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import connectDB from '@/config/database';

export const POST = async (request) => {
  try {
    await connectDB();
    // console.log(await req.body.json(), 'hello');
    const formData = await request.formData();
    const email = formData.get('email');
    const username = formData.get('username');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const otp = formData.get('otp');

    // console.log(JSON.parse(req.body));
    // const body = await req.json();

    // const { email, username, password, confirmPassword, otp } = body;

    // console.log(body);

    console.log('heeloo2');
    if (!username || !email || !password || !confirmPassword || !otp) {
      return new Response(
        JSON.stringify({
          message: 'All fields are required',
          success: false,
        }),
        { status: 403 }
      );
    }

    if (password !== confirmPassword) {
      return new Response(
        JSON.stringify({
          message: "Passwords don't match",
          success: false,
        }),
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new Response(
        JSON.stringify({
          message: 'User already exists',
          success: false,
        }),
        { status: 401 }
      );
    }

    const recentOTP = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (recentOTP.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'OTP expired',
        }),
        { status: 400 }
      );
    }

    if (recentOTP[0].otp !== otp) {
      return res.status(400).send(
        new Response(
          JSON.stringify({
            success: false,
            message: 'Wrong OTP',
          }),
          { status: 400 }
        )
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      bookmarks: [],
      image: `https://api.dicebear.com/7.x/initials/svg?seed=${username}`,
    });

    return new Response(
      JSON.stringify({
        message: 'User created successfully',
        user,
        success: true,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err.message);
    return new Response(
      JSON.stringify({
        message: 'Failed to sign up',
        success: false,
        error: err.message,
      }),
      { status: 500 }
    );
  }
};
