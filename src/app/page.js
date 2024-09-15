import styles from "./page.module.css";
import "./globals.css";
import Link from "next/link";
import axios from "axios";
import Card from "@/components/Card/Card";
import { cookies } from 'next/headers'

export default async function Home() {

  let res = await axios.get("http://localhost:3000/api/product/");

  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value 
     
  return (
    <>
      <nav className={styles.navbar}>
        {token ? <>
         <Link href={"/addmovie"}>
              <button className={styles.btn}>Add movie</button>
            </Link>
            <Link href={"/profile"}>
            <button className={styles.btn}>profile</button>
          </Link>
          </>
           : 
          <>
            <Link href={"/register"}>
              <button className={styles.btn}>register</button>
            </Link>
            <Link href={"/login"}>
              <button className={styles.btn}>login</button>
            </Link>
          </>
        }
      </nav>
      <main className={styles.main}>
        {res.data.movies.map((el) => <Card data={el} key={el._id}  token={token}  />) }
      </main>
      <footer className={styles.footer}>
        <p>Copyright 2024</p>
      </footer>
    </>
  );
}