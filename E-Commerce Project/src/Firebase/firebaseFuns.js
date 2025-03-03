import { doc, setDoc ,getDoc } from 'firebase/firestore';
import { db , auth } from './firebase';
import {  createUserWithEmailAndPassword , signInWithEmailAndPassword , signOut } from 'firebase/auth';

export const saveCart = async (userId, cartItems) => {
    try {
        await setDoc(doc(db, 'carts', userId), { items: cartItems });
        console.log('Cart saved successfully!');
    } catch (error) {
        console.error('Error saving cart:', error);
    }
};

export const saveFavorites = async (userId, favoriteItems) => {
    try {
        await setDoc(doc(db, 'favorites', userId), { items: favoriteItems });
        console.log('Favorites saved successfully!');
    } catch (error) {
        console.error('Error saving favorites:', error);
    }
};

export const fetchCart = async (userId) => {
    try {
        const cartDoc = await getDoc(doc(db, 'carts', userId));
        return cartDoc.exists() ? cartDoc.data().items : [];
        } catch (error) {
        console.error('Error fetching cart:', error);
        return [];
        }
    };

export const fetchFavorites = async (userId) => {
    try {
        const favoritesDoc = await getDoc(doc(db, 'favorites', userId));
        return favoritesDoc.exists() ? favoritesDoc.data().items : [];
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return [];
    }
};


export const getUserProfile = async (userId) => {
    try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data(); // البيانات الخاصة بالمستخدم
        } else {
            console.log("No such user!");
            return null;
        }
    } catch (error) {
        console.error("Error getting user profile:", error);
        return null;
    }
};


export const signUp = async (email, password,username) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User registered:', user);
        await setDoc(doc(db, "users", user.uid), {
            username: username,
            email: email,
        });
        return user; // إرجاع معلومات المستخدم
    } catch (error) {
        console.error('Error during sign up:', error.message);
        throw new Error(error.message); // رمي الخطأ لإدارته في واجهة المستخدم
    }
};


export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in:', userCredential.user);
        return userCredential.user; // إرجاع معلومات المستخدم
    } catch (error) {
        console.error('Error during login:', error.message);
        throw new Error(error.message); // رمي الخطأ لإدارته في واجهة المستخدم
    }
};


export const logout = async () => {
    try {
        await signOut(auth);
        console.log('User logged out');
        localStorage.removeItem('user');
        localStorage.removeItem('favorites'); 
        localStorage.removeItem('cart');
        localStorage.removeItem('productsNum');
        localStorage.removeItem('total');

    } catch (error) {
        console.error('Error during logout:', error.message);
    }
};