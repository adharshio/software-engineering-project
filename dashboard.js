import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// 1. PASTE YOUR CONFIG HERE (Same as login page)
const firebaseConfig = {
  // ... Paste your config here ...
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 2. Security Check (The Gatekeeper)
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in.
        console.log("Current User:", user.email);
        
        // Update UI with user info
        document.getElementById('userEmail').textContent = user.email;
        // Optionally set the avatar letter
        document.querySelector('.avatar').textContent = user.email.charAt(0).toUpperCase();
        
    } else {
        // No user is signed in. Kick them out!
        window.location.href = "index.html";
    }
});

// 3. Logout Function
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.href = "index.html";
    }).catch((error) => {
        console.error("Logout Error:", error);
    });
});