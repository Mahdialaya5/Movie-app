import styles from "./page.module.css";
import "./globals.css";
import axios from "axios";
import Card from "@/components/Card/Card";
import Navbar from "@/components/Navbar/Navbar";


export const dynamic = 'force-dynamic';
export default async function Home() {
   try {
    var  res = await axios.get(`${process.env.Base_url}/api/movie/`)
   } catch (error) {
    return Promise.reject(error);
   }
  
    
     
    return (
    <>
      <Navbar/>
      <main className={styles.main}>
        {res.data.movies.map((el) => (
          <Card data={el} key={el._id}  />
        ))}
      </main>
      <footer className={styles.footer}>
         <p> <span  className={styles.M}  >Mahdi</span><br/>	&copy;copyright</p>
      </footer>
    </>
  );
}