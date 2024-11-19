'use client'
import { signOut, useSession } from "next-auth/react";
import styles from "./nav.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect,useState } from "react";

function Navbar() {

    const {data, status}= useSession()
    const router=useRouter()
    const [path, setCurrentPath] = useState('');

    useEffect(() => {
     setCurrentPath(window.location.pathname)
    })

    const handleClick=async()=>{
        await signOut({ redirect: false })
           router.push('/')
       }
    
  
  return (
    <nav className={styles.navbar}>
       {status === 'loading' ? null : 
        status === 'authenticated' ? 
        <>
        <p  className={styles.name} >{data.user.name}</p>
        {data?.user.role==="admin" ?<> <Link href="/addmovie">
          <button className={styles.btn}>Add movie</button>
        </Link>
         <Link href="/admin">
         <button className={styles.btn}>userlist</button>
       </Link>
       </> : null}
        <div className={styles.user_nav}  >
        <Link href={path==='/' ? '/profile' : '/' }>
          <button className={styles.btn}>{path==='/' ? 'Profile' : 'Home' }</button>
        </Link>  
        <button className={styles.btn} onClick={handleClick}>Logout</button>
        </div>
         </>
        : <div  className={styles.nav_guest} >
        <Link href="/register">
          <button className={styles.btn}>Register</button>
        </Link>
        <Link href="/login">
          <button className={styles.btn}>Login</button>
        </Link>
      </div>
    }
  </nav>
  )
}

export default Navbar