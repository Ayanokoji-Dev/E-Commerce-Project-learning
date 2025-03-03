import  { createContext, useState, useContext, useEffect } from 'react';
import { signUp, login, fetchCart, fetchFavorites } from './firebaseFuns'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cart , setCart]= useState([]);
    const [error,setError]=useState('');



    useEffect(() => {
        if (user) {
            // إذا كان هناك مستخدم مسجل دخول، جلب العربة الخاصة به من Firestore
            const loadCart = async () => {
                const userCart = await fetchCart(user.uid);
                setCart(userCart);
            };
            loadCart();
        }
    }, [user]);

    // دالة للتسجيل
    const handleSignUp = async (email, password , username) => {
        try {
            const registeredUser = await signUp(email, password ,username );
            setUser(registeredUser); // حفظ معلومات المستخدم بعد التسجيل
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Account Already Exist / Invalid')
        }
    };

    // دالة لتسجيل الدخول
    const handleLogin = async (email, password) => {
        try {
            const loggedInUser = await login(email, password);
            setUser(loggedInUser); // حفظ معلومات المستخدم بعد تسجيل الدخول
            localStorage.setItem("user", JSON.stringify(loggedInUser));
            const userCart = await fetchCart(loggedInUser.uid);
            localStorage.setItem('cart', JSON.stringify(userCart));
            localStorage.setItem('productsNum', JSON.stringify(userCart.length));
            setCart(userCart);
            console.log(userCart);
            
            const userFavorites = await fetchFavorites(loggedInUser.uid);
            localStorage.setItem('favorites', JSON.stringify(userFavorites));
            console.log('favorites added after log in : ',userFavorites);

            window.location.reload();

        } catch (error) {
            console.error('Error logging in:', error);
            setError('Invalid Email or Password')
            alert('Invalid email or password. Please try again.');
            window.location.reload();
        }
    };


    return (
        <AuthContext.Provider value={{ user, setUser ,  handleSignUp, handleLogin , cart , error  }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
