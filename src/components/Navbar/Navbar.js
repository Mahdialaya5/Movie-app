'use client'
import { signOut, useSession } from "next-auth/react";
import styles from "./nav.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Navbar() {

    const {data, status}= useSession()
     const router=useRouter()

    const handleClick=async()=>{
        await signOut({ redirect: false })
           router.push('/')
        
       }
    

  return (
    <nav className={styles.navbar}>
    {status==='authenticated' ? 
      <>
        <Link href={"/addmovie"}>
          <button className={styles.btn}>Add movie</button>
        </Link>
        <Link href={"/profile"}>
          <button className={styles.btn}>Profile</button>
        </Link>
        <button className={styles.btn}  onClick={()=>handleClick()} >Signout</button>
      </> :  <>
        <Link href={"/register"}>
          <button className={styles.btn}>Register</button>
        </Link>
        <Link href={"/login"}>
          <button className={styles.btn}>Login</button>
        </Link>
       </>
    }
  </nav>
  )
}

export default Navbar