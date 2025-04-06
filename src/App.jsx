
import React, { useState } from 'react';
import './style.css';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4EmSsePUjCSgDYMwinJop_CTxsEedprY",
  authDomain: "theawakeningofauri.firebaseapp.com",
  projectId: "theawakeningofauri",
  storageBucket: "theawakeningofauri.appspot.com",
  messagingSenderId: "1054553977768",
  appId: "1:1054553977768:web:104091ef819e89e6b8e39d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const [name, setName] = useState('');
  const [why, setWhy] = useState('');
  const [intention, setIntention] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "portal_entries"), {
        name,
        why,
        intention,
        timestamp: serverTimestamp()
      });
      setSubmitted(true);
    } catch (err) {
      alert("Something went wrong.");
    }
  };

  return (
    <div className="container">
      {submitted ? (
        <div className="thanks">Entry received. Welcome.</div>
      ) : (
        <form onSubmit={handleSubmit} className="form">
          <h1>Welcome</h1>
          <p>You’ve heard the call. Enter your name to begin remembering.</p>
          <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
          <select value={why} onChange={(e) => setWhy(e.target.value)} required>
            <option value="">Why are you here?</option>
            <option>To Awaken</option>
            <option>To Remember</option>
            <option>To Connect</option>
            <option>To Explore Auri</option>
            <option>I don’t know yet</option>
          </select>
          <textarea placeholder="Message or intention (optional)" value={intention} onChange={(e) => setIntention(e.target.value)} />
          <button type="submit">Begin Your Journey</button>
        </form>
      )}
    </div>
  );
}
