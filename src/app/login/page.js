"use client";
import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/api/user/login", {
       email, password
      },{ withCredentials: true })
      .then((data) =>  router.push("/profile"))
      .catch((err) => console.log(err))
      
   
  };

  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <h2 className={styles.title}>LOGIN</h2>
      <label>email:</label>
      <input onChange={(e) => setEmail(e.target.value)} />
      <label>password:</label>
      <input type="password"   onChange={(e) => setPassword(e.target.value)} />
      <button   className={styles.btn}> save</button>
      <Link href={"/"} className={styles.btn_return}> return</Link>
    </form>
  );
}

export default Login;