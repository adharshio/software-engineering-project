// 1. Import Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup 
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// 2. PASTE YOUR CONFIG HERE (From Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyAKiFyOcmh8RxoggOGPYBUKq4TxXz7rNkU",
    authDomain: "e-complaint-management.firebaseapp.com",
    projectId: "e-complaint-management",
    storageBucket: "e-complaint-management.firebasestorage.app",
    messagingSenderId: "1039398583217",
    appId: "1:1039398583217:web:f6b9082e4a2cd43ebc9b90",
    measurementId: "G-P13JLG20KX"
  };

// 3. Initialize App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// 4. Select DOM Elements (Matching your HTML IDs)
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const googleBtn = document.querySelector('.google-material'); // Your Google Button
const successMsg = document.getElementById('successMessage');
const submitBtn = document.querySelector('.login-btn');
const btnText = document.querySelector('.btn-text');
const btnLoader = document.querySelector('.btn-loader');

// Helper: Toggle Loading State
const toggleLoading = (isLoading) => {
    if (isLoading) {
        btnText.style.display = 'none';
        btnLoader.style.display = 'block';
        submitBtn.disabled = true;
    } else {
        btnText.style.display = 'block';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
    }
};

// Helper: Show Success Animation
const showSuccess = () => {
    // Reveal the hidden success message div from your HTML
    successMsg.style.display = 'flex'; 
    successMsg.style.opacity = '1';
    
    // Redirect after 2 seconds
    setTimeout(() => {
        window.location.href = "/dashboard.html"; // Change this to your actual page
    }, 2000);
};

// 5. Handle Email/Password Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Stop page refresh
    toggleLoading(true);

    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Logged in:", userCredential.user);
        toggleLoading(false);
        showSuccess();
    } catch (error) {
        toggleLoading(false);
        // Display error in your specific error spans
        if(error.code.includes('email') || error.code.includes('user')) {
            document.getElementById('emailError').textContent = "Invalid email or user not found.";
        } else if (error.code.includes('password')) {
            document.getElementById('passwordError').textContent = "Wrong password.";
        } else {
            alert(error.message);
        }
    }
});

// 6. Handle Google Login (Since you have the button!)
if (googleBtn) {
    googleBtn.addEventListener('click', async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log("Google User:", result.user);
            showSuccess();
        } catch (error) {
            console.error(error);
            alert("Google Sign-In failed: " + error.message);
        }
    });
}
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY_HERE",
//   authDomain: "your-project.firebaseapp.com",
//   projectId: "your-project",
//   storageBucket: "your-project.appspot.com",
//   messagingSenderId: "123456789",
//   appId: "1:123456:web:abcdef"
// };

// // 3. Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// // 4. Select DOM elements
// const emailInput = document.getElementById('email');
// const passwordInput = document.getElementById('password');
// const loginBtn = document.getElementById('loginBtn');
// const signupBtn = document.getElementById('signupBtn');


// // 5. Sign Up Logic (Create new user in "Database")
// signupBtn.addEventListener('click', async () => {
//     const email = emailInput.value;
//     const password = passwordInput.value;

//     try {
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         alert("Account created for: " + userCredential.user.email);
//     } catch (error) {
//         alert("Error: " + error.message);
//     }
// });

// // 6. Login Logic (Check credentials against "Database")
// loginBtn.addEventListener('click', async () => {
//     const email = emailInput.value;
//     const password = passwordInput.value;

//     try {
//         const userCredential = await signInWithEmailAndPassword(auth, email, password);
//         alert("Login Successful! Welcome " + userCredential.user.email);
//         // Redirect to another page if needed:
//         // window.location.href = "dashboard.html";
//     } catch (error) {
//         alert("Login Failed: " + error.message);
//     }
// });


// // Material Design Login Form JavaScript
// class MaterialLoginForm {
//     constructor() {
//         this.form = document.getElementById('loginForm');
//         this.emailInput = document.getElementById('email');
//         this.passwordInput = document.getElementById('password');
//         this.passwordToggle = document.getElementById('passwordToggle');
//         this.submitButton = this.form.querySelector('.material-btn');
//         this.successMessage = document.getElementById('successMessage');
//         this.socialButtons = document.querySelectorAll('.social-btn');
        
//         this.init();
//     }
    
//     init() {
//         this.bindEvents();
//         this.setupPasswordToggle();
//         this.setupSocialButtons();
//         this.setupRippleEffects();
//     }
    
//     bindEvents() {
//         this.form.addEventListener('submit', (e) => this.handleSubmit(e));
//         this.emailInput.addEventListener('blur', () => this.validateEmail());
//         this.passwordInput.addEventListener('blur', () => this.validatePassword());
//         this.emailInput.addEventListener('input', () => this.clearError('email'));
//         this.passwordInput.addEventListener('input', () => this.clearError('password'));
        
//         // Add Material Design input interactions
//         [this.emailInput, this.passwordInput].forEach(input => {
//             input.addEventListener('focus', (e) => this.handleInputFocus(e));
//             input.addEventListener('blur', (e) => this.handleInputBlur(e));
//         });
//     }
    
//     setupPasswordToggle() {
//         this.passwordToggle.addEventListener('click', (e) => {
//             this.createRipple(e, this.passwordToggle.querySelector('.toggle-ripple'));
            
//             const type = this.passwordInput.type === 'password' ? 'text' : 'password';
//             this.passwordInput.type = type;
            
//             const icon = this.passwordToggle.querySelector('.toggle-icon');
//             icon.classList.toggle('show-password', type === 'text');
//         });
//     }
    
//     setupSocialButtons() {
//         this.socialButtons.forEach(button => {
//             button.addEventListener('click', (e) => {
//                 const provider = button.classList.contains('google-material') ? 'Google' : 'Facebook';
//                 this.createRipple(e, button.querySelector('.social-ripple'));
//                 this.handleSocialLogin(provider, button);
//             });
//         });
//     }
    
//     setupRippleEffects() {
//         // Setup ripples for inputs
//         [this.emailInput, this.passwordInput].forEach(input => {
//             input.addEventListener('focus', (e) => {
//                 const rippleContainer = input.parentNode.querySelector('.ripple-container');
//                 this.createRipple(e, rippleContainer);
//             });
//         });
        
//         // Setup ripple for main button
//         this.submitButton.addEventListener('click', (e) => {
//             this.createRipple(e, this.submitButton.querySelector('.btn-ripple'));
//         });
        
//         // Setup checkbox ripple
//         const checkbox = document.querySelector('.checkbox-wrapper');
//         checkbox.addEventListener('click', (e) => {
//             const rippleContainer = checkbox.querySelector('.checkbox-ripple');
//             this.createRipple(e, rippleContainer);
//         });
//     }
    
//     createRipple(event, container) {
//         const rect = container.getBoundingClientRect();
//         const size = Math.max(rect.width, rect.height);
//         const x = event.clientX - rect.left - size / 2;
//         const y = event.clientY - rect.top - size / 2;
        
//         const ripple = document.createElement('div');
//         ripple.className = 'ripple';
//         ripple.style.width = ripple.style.height = size + 'px';
//         ripple.style.left = x + 'px';
//         ripple.style.top = y + 'px';
        
//         container.appendChild(ripple);
        
//         // Remove ripple after animation
//         setTimeout(() => {
//             ripple.remove();
//         }, 600);
//     }
    
//     handleInputFocus(e) {
//         const inputWrapper = e.target.closest('.input-wrapper');
//         inputWrapper.classList.add('focused');
//     }
    
//     handleInputBlur(e) {
//         const inputWrapper = e.target.closest('.input-wrapper');
//         inputWrapper.classList.remove('focused');
//     }
    
//     validateEmail() {
//         const email = this.emailInput.value.trim();
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
//         if (!email) {
//             this.showError('email', 'Email is required');
//             return false;
//         }
        
//         if (!emailRegex.test(email)) {
//             this.showError('email', 'Enter a valid email address');
//             return false;
//         }
        
//         this.clearError('email');
//         return true;
//     }
    
//     validatePassword() {
//         const password = this.passwordInput.value;
        
//         if (!password) {
//             this.showError('password', 'Password is required');
//             return false;
//         }
        
//         if (password.length < 6) {
//             this.showError('password', 'Password must be at least 6 characters');
//             return false;
//         }
        
//         this.clearError('password');
//         return true;
//     }
    
//     showError(field, message) {
//         const formGroup = document.getElementById(field).closest('.form-group');
//         const errorElement = document.getElementById(`${field}Error`);
        
//         formGroup.classList.add('error');
//         errorElement.textContent = message;
//         errorElement.classList.add('show');
        
//         // Add Material Design shake animation
//         const input = document.getElementById(field);
//         input.style.animation = 'materialShake 0.4s ease-in-out';
//         setTimeout(() => {
//             input.style.animation = '';
//         }, 400);
//     }
    
//     clearError(field) {
//         const formGroup = document.getElementById(field).closest('.form-group');
//         const errorElement = document.getElementById(`${field}Error`);
        
//         formGroup.classList.remove('error');
//         errorElement.classList.remove('show');
//         setTimeout(() => {
//             errorElement.textContent = '';
//         }, 200);
//     }
    
//     async handleSubmit(e) {
//         e.preventDefault();
        
//         const isEmailValid = this.validateEmail();
//         const isPasswordValid = this.validatePassword();
        
//         if (!isEmailValid || !isPasswordValid) {
//             // Add material feedback for invalid form
//             this.submitButton.style.animation = 'materialPulse 0.3s ease';
//             setTimeout(() => {
//                 this.submitButton.style.animation = '';
//             }, 300);
//             return;
//         }
        
//         this.setLoading(true);
        
//         try {
//             // Simulate Material Design authentication flow
//             await new Promise(resolve => setTimeout(resolve, 2000));
            
//             // Show Material success state
//             this.showMaterialSuccess();
//         } catch (error) {
//             this.showError('password', 'Sign in failed. Please try again.');
//         } finally {
//             this.setLoading(false);
//         }
//     }
    
//     async handleSocialLogin(provider, button) {
//         console.log(`Initiating ${provider} sign-in...`);
        
//         // Add Material loading state
//         button.style.pointerEvents = 'none';
//         button.style.opacity = '0.7';
        
//         try {
//             await new Promise(resolve => setTimeout(resolve, 1500));
//             console.log(`Redirecting to ${provider} authentication...`);
//             // window.location.href = `/auth/${provider.toLowerCase()}`;
//         } catch (error) {
//             console.error(`${provider} authentication failed: ${error.message}`);
//         } finally {
//             button.style.pointerEvents = 'auto';
//             button.style.opacity = '1';
//         }
//     }
    
//     setLoading(loading) {
//         this.submitButton.classList.toggle('loading', loading);
//         this.submitButton.disabled = loading;
        
//         // Disable social buttons during login
//         this.socialButtons.forEach(button => {
//             button.style.pointerEvents = loading ? 'none' : 'auto';
//             button.style.opacity = loading ? '0.6' : '1';
//         });
//     }
    
//     showMaterialSuccess() {
//         // Hide form with Material motion
//         this.form.style.transform = 'translateY(-16px) scale(0.95)';
//         this.form.style.opacity = '0';
        
//         setTimeout(() => {
//             this.form.style.display = 'none';
//             document.querySelector('.social-login').style.display = 'none';
//             document.querySelector('.signup-link').style.display = 'none';
            
//             // Show success with Material elevation
//             this.successMessage.classList.add('show');
            
//             // Add Material success animation
//             const successIcon = this.successMessage.querySelector('.success-icon');
//             successIcon.style.animation = 'materialSuccessScale 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
            
//         }, 300);
        
//         // Simulate redirect with Material timing
//         setTimeout(() => {
//             console.log('Redirecting to dashboard...');
//             // window.location.href = '/dashboard';
//         }, 2500);
//     }
// }

// // Add Material Design specific animations
// if (!document.querySelector('#material-keyframes')) {
//     const style = document.createElement('style');
//     style.id = 'material-keyframes';
//     style.textContent = `
//         @keyframes materialShake {
//             0%, 100% { transform: translateX(0); }
//             25% { transform: translateX(-4px); }
//             75% { transform: translateX(4px); }
//         }
        
//         @keyframes materialPulse {
//             0% { transform: scale(1); }
//             50% { transform: scale(1.02); }
//             100% { transform: scale(1); }
//         }
        
//         @keyframes materialSuccessScale {
//             0% { transform: scale(0); }
//             50% { transform: scale(1.1); }
//             100% { transform: scale(1); }
//         }
//     `;
//     document.head.appendChild(style);
// }

// // Initialize the form when DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     new MaterialLoginForm();
// });
