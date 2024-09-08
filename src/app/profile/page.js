"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from './profile.module.css'
import Link from "next/link";

function Profile() {
  
    const token= document.cookie.split('=')[1]
    const [user, setuser] = useState({})

   useEffect(() => {
   
 if (token) {
    axios.get("http://localhost:3000/api/user/",{ headers: { Authorization: `Bearer ${token}` }})
     .then((res) => setuser(res.data.user))
     .catch((err) => console.log(err))
 }  

}, [])

   

  return (
    <>
    <nav className={styles.navbar}  > 
   
          <div className={styles.nav} > 
            <Link href={"/addmovie"}>
              <button className={styles.btn}>Add movie</button>
            </Link>
            
            <Link href={"/"}>
            <button className={styles.btn}>Home</button>
          </Link>
          </div>
          <button className={styles.btn_logout}  >Logout</button>
    </nav>
     <p>email:{user.email}</p>
    </>
  );
}

export default Profile;