"use client"
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RegistrationForm = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showUsrValid, setShowUsrValid] = useState(false);

  const onSubmit = handleSubmit(async data => {
    try {
      const response = await fetch('/api/usuario/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Registro exitoso
        router.push('/login');
      } else {
        // Falló el registro
        setShowUsrValid(true);
        const errorData = await response.json();
        console.error('Error al registrarse:', errorData);
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form className="border rounded-lg shadow-md p-6 space-y-3 bg-gray-50" onSubmit={onSubmit}>
        <h1 className="text-black mb-3 text-2xl text-center">Sign Up</h1>
        <div className="w-full">
          <label className="mb-3 mt-5 block text-xs font-medium text-black" htmlFor="name">Name</label>
          <input
            className="text-black peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-black"
            type='text'
            placeholder="Enter your name"
            {...register('name', {
              required: { value: true, message: 'Name is required' },
            })}
          />
          {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}

          <label className="mb-3 mt-5 block text-xs font-medium text-black" htmlFor="email">Email</label>
          <input
            className="text-black peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-black"
            type='email'
            placeholder="Enter your email address"
            {...register('email', {
              required: { value: true, message: 'Email is required' },
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
            })}
          />
          {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}

          <label className="mb-3 mt-5 block text-xs font-medium text-black" htmlFor="password">Password</label>
          <input
            className="text-black peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-black"
            type='password'
            placeholder="Enter password"
            {...register('password', {
              required: { value: true, message: 'Password is required' },
              maxLength: { value: 12, message: 'Password must be less than 12 characters' }
            })}
          />
          {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
        </div>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            <button className="text-sm text-white bg-blue-600 rounded-md px-10 py-3" type="submit">Send</button>
          </span>
        </div>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            Already have an account? <Link href="/login" className="text-blue-500 underline">Log in</Link>
          </span>
        </div>

        {showUsrValid && <span className="text-red-500 text-xs mt-1">Registration failed! Please try again.</span>}
      </form>
    </main>
  );
};

export default RegistrationForm;
