'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Homepage = () => {
  return <ProtectedHomepage />;
};

const ProtectedHomepage = () => {
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
