// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// إعدادات Firebase (استبدل القيم بمعلومات مشروعك)
const firebaseConfig = {
    apiKey: "AIzaSyCFmNEBicxNebHE1W-tO9q17_gVYUjtvs0",
    authDomain: "e-commerce-test-bf125.firebaseapp.com",
    projectId: "e-commerce-test-bf125",
    storageBucket: "e-commerce-test-bf125.firebasestorage.app",
    messagingSenderId: "769759462444",
    appId: "1:769759462444:web:50b406afdd6111f3623d89",
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);

// تصدير الخدمات
export const db = getFirestore(app); // قاعدة البيانات
export const auth = getAuth(app); // المصادقة
