import { useEffect, useState } from "react";
import { useAuth } from "../Firebase/firebaseContext";
import { getUserProfile, logout } from "../Firebase/firebaseFuns"; 
import '../Styles/Profile.css'

const Profile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (user && user.uid) {
            const fetchProfile = async () => {
                try {
                    const userData = await getUserProfile(user.uid);
                    setProfile(userData);
                } catch (error) {
                    console.error('Error fetching profile:', error);
                }
            };
            fetchProfile();
            console.log(profile)
        }
    }, [user]);


    function calculateDate(createdAt) {
        console.log(createdAt,'1')
        const timestamp = parseInt(createdAt); 
        console.log(timestamp,'2')
        const date = new Date(timestamp); 
        console.log(date,'3')
        return date.toLocaleString(); 
    }
    

    return (
        <div className="profile">
            <h1>User Profile</h1>
            {profile ? (
                <div className="profile-info">
                    <p><strong>Name:</strong> {profile.username}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Created Account At :</strong> {calculateDate(user.createdAt)}</p>
                    <p><strong>Last Log in At :</strong> {calculateDate(user.lastLoginAt)}</p>
                    <button className="logOut" onClick={()=>{
                        logout()
                        window.location.reload();
                    }} >Log Out</button>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default Profile;
