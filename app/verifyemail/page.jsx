'use client';

import OTPInput from 'react-otp-input';

import { useSignUpContext } from '@/context/SignUpdata';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

const VerifyEmail = () => {
  const { signupData } = useSignUpContext();
  const [otp, setotp] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (signupData?.email === '') {
      router.push('/signup');
    }
  }, [signupData]);

  const handleResend = async (e) => {
    e.preventDefault();
    try {
      const id = toast.loading('Loading');
      const formData = new FormData();
      formData.append('email', signupData.email);

      const response = await fetch('/api/sendotp', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      toast.dismiss(id);
      if (data.success) {
        toast.success('OTP sent successfully');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    const id = toast.loading('Loading');
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('email', signupData.email);
      formData.append('username', signupData.username);
      formData.append('otp', otp);
      formData.append('password', signupData.password);
      formData.append('confirmPassword', signupData.confirmPassword);

      const response = await fetch(`/api/signup`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      toast.dismiss(id);
      if (data.success) {
        toast.success(data.message);
        router.push('/login');
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen text-white bg-gray-900 p-4 sm:p-8'>
      <div className='flex flex-col justify-between w-full max-w-lg text-white gap-4'>
        <h1 className='text-3xl font-semibold font-inter'>Verify Email</h1>
        <p className='text-richblack-400 text-lg'>
          A verification mail has been sent to you. Enter the code below.
        </p>
        <form onSubmit={handleSubmit} className='mt-8'>
          <OTPInput
            value={otp}
            onChange={setotp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            inputStyle='h-10 sm:w-12 sm:h-12 md:w-24 rounded-md border border-richblack-500 text-2xl text-center bg-[#161D29] focus:outline-none'
            focusStyle='border-2 border-red-500'
            isInputNum
            shouldAutoFocus
            containerStyle='flex justify-between gap-2 sm:gap-4'
            renderInput={(props) => <input {...props} />}
          />
          <button
            type='submit'
            className='w-full bg-yellow-50 text-black font-inter text-xl p-2 rounded-md mt-12 hover:bg-yellow-100 transition duration-300'
          >
            Verify Email
          </button>
        </form>

        <button
          onClick={handleResend}
          className='mt-4 text-sm text-blue-500 hover:underline'
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
