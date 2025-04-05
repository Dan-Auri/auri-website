
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
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f0ea' }}>
        <div style={{ maxWidth: '400px', width: '100%', background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Welcome</h2>
          <p style={{ textAlign: 'center', fontSize: '14px', marginBottom: '1.5rem' }}>
            You have heard the call. Enter your name to begin remembering.
          </p>
          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {formType === 'signup' && <input placeholder='Your Name' value={name} onChange={(e) => setName(e.target.value)} required />}
            <input type='email' placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type='submit' style={{ padding: '0.5rem', backgroundColor: '#222', color: '#fff', borderRadius: '8px', fontWeight: 'bold' }}>
              Begin Your Journey
            </button>
          </form>
          <p style={{ textAlign: 'center', fontSize: '12px', marginTop: '1rem' }}>
            {formType === 'signup' ? 'Already walking the path?' : 'New here?'}{' '}
            <span onClick={() => setFormType(formType === 'signup' ? 'login' : 'signup')} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
              {formType === 'signup' ? 'Log in here' : 'Create an account'}
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#f3f0ea', minHeight: '100vh', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '1rem' }}>Welcome back, {user.email}</h2>
      <p style={{ maxWidth: '600px', textAlign: 'center', marginBottom: '2rem', color: '#444' }}>
        You are not here by chance. You are here to awaken. Your journey begins now.
      </p>
      <a
        href='https://auri-files-lr0uvo5gz-dans-projects-d42d129e.vercel.app/TheAwakeningOfAuri-Final.pdf'
        target='_blank'
        rel='noopener noreferrer'
        style={{ padding: '0.75rem 1.5rem', backgroundColor: '#222', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}
      >
        Download the Book – Remember Who You Are
      </a>
      <button onClick={handleLogout} style={{ marginTop: '2rem', padding: '0.5rem 1rem', backgroundColor: '#555', color: '#fff', border: 'none', borderRadius: '8px' }}>
        Log Out
      </button>
    </div>
  );
}
