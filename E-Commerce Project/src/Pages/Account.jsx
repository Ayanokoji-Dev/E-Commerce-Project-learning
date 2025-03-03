import { useEffect, useState } from 'react'
import  '../Styles/Account.css'
import Signup from '../Components/Signup';
import Login from '../Components/Login';
import Profile from '../Components/Profile';
import { useAuth } from '../Firebase/firebaseContext';

const Account = () => {

    const [section,setSection]=useState("signUp");

    const {user ,setUser }=useAuth();

    useEffect(() => {
        // استرجاع بيانات المستخدم من localStorage إذا كانت موجودة
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser); // تعيين المستخدم إذا كان موجودًا
        }
    }, [setUser]);



    useEffect(() => {
        if (user) {
            setSection("profile"); // إذا كان المستخدم مسجلاً دخوله، نعرض صفحة الملف الشخصي
        }else{
            setSection("logIn")
        }
    }, [user]);

    // const reloadPage = () => {
    //     window.location.reload();
    // };


    return (
        <div className='account'>
            {section === "signUp" ? (
                <Signup changeSection={setSection} finishedFun={() => setSection("profile")} />
            ) : section === "logIn" ? (
                <Login changeSection={setSection} finishedFun={() => setSection("profile")} />
            ) : (
                <Profile />
            )}
        </div>
    )
}

export default Account
