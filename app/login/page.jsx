'use client';

import { doCredentialLogin } from '@/utils/loginHelper';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

const page = () => {
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const id = toast.loading('Loading');
      const formData = new FormData(event.currentTarget);

      const response = await doCredentialLogin(formData);

      if (response.user) {
        toast.dismiss(id);
        toast.success('Logged In');
        console.log('Logged In');
      }
      if (response === false) {
        console.error(response.error);
      } else {
        router.push('/');
      }
      toast.dismiss(id);
    } catch (e) {
      toast.dismiss(id);
      console.error(e);
    }
  }
  return (
    <section className='bg-blue-50 min-h-screen flex-grow'>
      <div className='container m-auto max-w-lg py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          {/* <!-- Register Form--> */}
          <form onSubmit={onSubmit}>
            <h2 className='text-3xl text-center font-semibold mb-6'>Login</h2>

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

            {/* <!-- Submit Button --> */}
            <div>
              <button
                className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Login
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
