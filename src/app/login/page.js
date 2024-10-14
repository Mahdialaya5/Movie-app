"use client"; 
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from './login.module.css'
import { useState,useEffect } from "react";
import Link from "next/link";



export default function SignInForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const {data, status}= useSession()

  useEffect(() => {
    if (data) {
      router.push('/'); 
    }})

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
  !result.error? router.push("/") :setError("bad Credentials") ;
  }

  return (

    <form onSubmit={handleSubmit}  className={styles.form} >
      <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="current-Email"
          required
        /> 
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      {error && <p  className={styles.err} >{error}</p>}
      <button type="submit" className={styles.btn}   >Sign In</button>
      <Link href={"/"} className={styles.btn_return}> return</Link>
    </form>

  );
}



