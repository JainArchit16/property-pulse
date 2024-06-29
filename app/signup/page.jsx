'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSignUpContext } from '@/context/SignUpdata';
import toast from 'react-hot-toast';

const page = () => {
  const router = useRouter();

  const { setSignUpData } = useSignUpContext();

  async function handleSubmit(event) {
    const id = toast.loading('Loading');
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const username = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('password2');
    setSignUpData({
      email: email,
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    });
    toast.dismiss(id);
    try {
      const formData = new FormData();
      formData.append('email', email);

      const response = await fetch('/api/sendotp', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success('OTP sent successfully');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
    router.push('/verifyemail');
  }
  return (
    <section className='bg-blue-50 min-h-screen flex-grow'>
      <div className='container m-auto max-w-lg py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          {/* <!-- Register Form--> */}
          <form onSubmit={handleSubmit}>
            <h2 className='text-3xl text-center font-semibold mb-6'>
              Create An Account
            </h2>

            {/* <!-- Name --> */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>Name</label>
              <input
                type='text'
                id='name'
                name='name'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Full name'
                required
              />
            </div>

            {/* <!-- Email --> */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Email address'
                required
              />
            </div>

            {/* <!-- Password --> */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Password'
                required
              />
            </div>

            {/* <!-- Password --> */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Confirm Password
              </label>
              <input
                type='password'
                id='password2'
                name='password2'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Confirm Password'
                required
              />
            </div>

            {/* <!-- Submit Button --> */}
            <div>
              <button
                className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='flex-grow'></div>
    </section>
  );
};

export default page;
