import styles from "./page.module.css";
import "./globals.css";
import axios from "axios";
import Card from "@/components/Card/Card";
import Navbar from "@/components/Navbar/Navbar";



export default async function Home() {

  let res = await axios.get(`${process.env.Base_url}/api/movie/`);
    
     
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