import { passwordUpdated } from '@/mail/templates/passwordUpdated';
import User from '@/models/User';
import bcrypt from 'bcrypt';

export const POST = async (req) => {
  try {
    const formData = await req.formData(); // Correct way to parse JSON body

    const oldPassword = formData.get('oldPassword');
    const newPassword = formData.get('newPassword');
    const confirmNewPassword = formData.get('confirmNewPassword');

    if (!oldPassword || !newPassword || confirmNewPassword) {
      return new Response(
        JSON.stringify({
          message: 'All Fields Required',
          success: false,
        }),
        { status: 400 }
      );
    }
    if (newPassword !== confirmNewPassword) {
      return new Response(
        JSON.stringify({
          message: 'Password does not match',
          success: false,
        }),
        { status: 400 }
      );
    }

    const userDetails = await User.findById(req.user.id); //problem might be here

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );

    if (!userDetails) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'No user exists',
        }),
        { status: 500 }
      );
    }
    if (oldPassword === newPassword) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'New Password cannot be the same as Old Password',
        }),
        { status: 400 }
      );
    }

    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return new Response(
        JSON.stringify({
          success: false,
          message: 'The password is incorrect',
        }),
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = User.findOneAndUpdate(
      req.user.id,
      {
        password: hashedPassword,
      },
      { new: true }
    );

    try {
      const link = process.env.FRONTEND_LINK;
      const info = await sendMail(
        updatedUser.email,
        'Passowrd Changed',
        passwordUpdated(updatedUser.email, updatedUser.username, link)
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Error occurred while sending email',
          error: error.message,
        }),
        { status: 500 }
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Password updated successfully',
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Error occurred while updating password',
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
