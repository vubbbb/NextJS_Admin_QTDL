'use client';
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import AuthContext from '@/app/context/AuthContext';

const Homepage = () => {
  return <ProtectedHomepage />;
};

const ProtectedHomepage = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
    }
  }, [router]);

  return <div>Homepage</div>;
};

export default Homepage;
