import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FcGoogle } from 'react-icons/fc';
import { auth, googleProvider } from '@/firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Replace '/dashboard' with your desired redirect route
    } catch (error: any) {
      let errorMessage = error.message;
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email or password.';
      }
      setError(errorMessage);
      console.error('Login error:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard'); // Replace '/dashboard' with your desired redirect route
    } catch (error: any) {
      setError(error.message);
      console.error('Google Sign-in error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-scholarship-background text-scholarship-foreground p-4">
      <div className="w-full max-w-md bg-white/5 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-scholarship-accent">
          Login to OpporUnity
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-scholarship-foreground/80">
              Email
            </label>
            <Input
              type="email"
              id="email"
              className="mt-1 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-scholarship-foreground/80">
              Password
            </label>
            <Input
              type="password"
              id="password"
              className="mt-1 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-scholarship-foreground/70">
          Or sign in with
        </div>
        <Button
          onClick={handleGoogleSignIn}
          className="w-full mt-2 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white"
        >
          <FcGoogle className="text-2xl" />
          Sign in with Google
        </Button>
        <div className="mt-4 text-center text-sm text-scholarship-foreground/70">
          Don't have an account? <Link to="/register" className="text-scholarship-accent hover:underline">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;