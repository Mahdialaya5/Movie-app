import styles from "./page.module.css";
import "./globals.css";
import Link from "next/link";
import axios from "axios";
import Card from "@/components/Card/Card";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route"

import Navbar from "@/components/Navbar/Navbar";
import { useSession } from "next-auth/react";



export default async function Home() {

  let res = await axios.get("http://localhost:3000/api/product/");
   const session = await getServerSession(authOptions);
   
 

    return (
    <>
      <Navbar/>
      <main className={styles.main}>
        {res.data.movies.map((el) => (
          <Card data={el} key={el._id} session={session} />
        ))}
      </main>
      <footer className={styles.footer}>
        <p>Copyright 2024</p>
      </footer>
    </>
  );
}