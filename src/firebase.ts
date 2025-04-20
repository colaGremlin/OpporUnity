import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth'; // Import GoogleAuthProvider
import { getFirestore } from 'firebase/firestore'; // To use the storage room

const firebaseConfig = {
  apiKey: "AIzaSyD0QWMyp6sKHqf71T3UZqjWqHmn-YnXaMc",
  authDomain: "pakscholar-1db82.firebaseapp.com",
  projectId: "pakscholar-1db82",
  storageBucket: "pakscholar-1db82.firebasestorage.app",
  messagingSenderId: "703386276986",
  appId: "1:703386276986:web:70bf69bab15670b17f57c3"
};

// Initialize Firebase using your special key
const app = initializeApp(firebaseConfig);

// Get the tool for people logging in
const auth = getAuth(app);

// Create a GoogleAuthProvider instance
const googleProvider = new GoogleAuthProvider();

// Get the tool for the storage room (Firestore)
const db = getFirestore(app);

// Now we're making these tools available to other parts of your website's code
export { auth, db, app, googleProvider }; // Export googleProvider as well