import styles from "./page.module.css";
import "./globals.css";
import axios from "axios";
import Card from "@/components/Card/Card";
import Navbar from "@/components/Navbar/Navbar";


export const dynamic = 'force-dynamic';

export default async function Home() {
    let movies=[]
   try {
    const  res = await axios.get(`${process.env.Base_url}/api/movie/`)
           movies = res.data.movies || [];
   } catch (error) {
    console.log(error);
   }
  
    
    return (
    <>
      <Navbar/>
      <main className={styles.main}>
        {movies.length > 0 ? movies.map((el) => (
          <Card data={el} key={el._id}  />
        )): <p>not movies found</p>}
      </main>
      <footer className={styles.footer}>
      <p>&copy; 2024 Mahdi. All rights reserved.</p>
      </footer>
    </>
  );
}