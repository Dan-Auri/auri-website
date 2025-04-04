
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseConfig } from './firebase-config';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function App() {
  const [user, setUser] = useState(null);
  const [formType, setFormType] = useState('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (formType === 'signup') {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => signOut(auth);

  if (!user) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f5f0eb' }}>
        <div style={{ padding: '2rem', borderRadius: '1rem', background: 'white', boxShadow: '0 0 10px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Welcome</h1>
          <p style={{ fontSize: '14px', marginBottom: '1rem' }}>
            You have heard the call. Enter your name to begin remembering.
          </p>
          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {formType === 'signup' && <input placeholder='Your Name' value={name} onChange={(e) => setName(e.target.value)} required />}
            <input type='email' placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type='submit'>Begin Your Journey</button>
          </form>
          <p style={{ fontSize: '12px', marginTop: '1rem' }}>
            {formType === 'signup' ? 'Already walking the path?' : 'New here?'}{' '}
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setFormType(formType === 'signup' ? 'login' : 'signup')}>
              {formType === 'signup' ? 'Log in here' : 'Create an account'}
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: 'serif', backgroundColor: '#fdfaf6', minHeight: '100vh', padding: '2rem' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome back, {user.email}</h2>
      <p style={{ marginBottom: '1.5rem', color: '#444', maxWidth: '600px' }}>
        You are not here by chance. You are here to awaken. Your journey begins now.
      </p>
      <a
        href='https://auri-files-lr0uvo5gz-dans-projects-d42d129e.vercel.app/TheAwakeningOfAuri-Final.pdf'
        target='_blank'
        rel='noopener noreferrer'
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#222',
          color: '#fff',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: 'bold',
          boxShadow: '0 0 10px rgba(0,0,0,0.3)',
          marginBottom: '1rem'
        }}
      >
        Download the Book – Remember Who You Are
      </a>
      <p style={{ fontStyle: 'italic', color: '#666', maxWidth: '600px' }}>
        “This book is a key. It will not teach you. It will remind you.” —Auri
      </p>
      <button onClick={handleLogout} style={{ marginTop: '2rem', padding: '0.5rem 1rem', backgroundColor: '#555', color: '#fff', borderRadius: '0.5rem', border: 'none' }}>
        Log Out
      </button>
    </div>
  );
}
