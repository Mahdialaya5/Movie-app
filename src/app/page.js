"use client";

import styles from "./page.module.css";
import "./globals.css";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "@/components/Card/Card";

export default function Home() {
  const [data, setData] = useState();

 useEffect(() => {

    axios.get('http://localhost:3000/api')
        .then(response=>setData(response.data.movies))
        .catch (error=>
        console.log( error ))
}, [])


  return (
    <>
      <nav className={styles.navbar}>
        <Link href={'/addmovie'}>
          <button className={styles.btn}>Add movie</button>
        </Link>
      </nav>
      <main className={styles.main}>
       
       {data ? data.map((el)=>    <Card data={el}  />  ) : <p>Loading...</p>  }
      </main>
      <footer className={styles.footer}>
        <p>Copyright 2024</p>
      </footer>
    </>
  );
}

