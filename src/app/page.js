"use client";
import styles from "./page.module.css";
import "./globals.css";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "@/components/Card/Card";

export default function Home() {
  const [data, setData] = useState();
  const token = document.cookie.split("=")[1];
  useEffect(() => {
   
    axios
      .get("http://localhost:3000/api")
      .then((response) => setData(response.data.movies))
      .catch((error) => console.log(error));
  }, []);

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
        {data ? (
          data.map((el) => <Card data={el} key={el._id} />)
        ) : (
          <p className={styles.loading}>Loading...</p>
        )}
      </main>
      <footer className={styles.footer}>
        <p>Copyright 2024</p>
      </footer>
    </>
  );
}