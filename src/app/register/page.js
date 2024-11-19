"use client";
import React, { useState,useEffect } from "react";
import styles from "./register.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";

function Register() {
  
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setErr] = useState('')
  const {data, status}= useSession()

  useEffect(() => {
    if (data) {
      router.push('/'); 
    }})

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(process.env.NEXT_PUBLIC_BASEURL);
    axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/api/user/register`, {
       email,password,name
      })
      .then((data) => router.push("/login"))
      .catch((err) => { setErr(err.response)
  
        return Promise.reject(error);
      });

  };
  

  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <h2 className={styles.title}>REGISTER</h2>
      <label>email:</label>
      <input onChange={(e) => setEmail(e.target.value)}  type='email' />
      <label>username:</label>
      <input onChange={(e) => setName(e.target.value)}   autoComplete="current-username"  />
      <label>password:</label>
      <input type="password"  onChange={(e)=>setPassword(e.target.value)}  autoComplete="current-password" />
      {error ? <p  className={styles.err}  >{error.data.msg}</p>: null}
      <button className={styles.btn}>register</button>
      <Link href={"/"} className={styles.btn_return}> return</Link>
    </form>
  );
}

export default Register;