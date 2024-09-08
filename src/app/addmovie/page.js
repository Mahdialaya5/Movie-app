"use client";
import React, { useState } from "react";
import styles from "./add.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

function addmovie() {

  const router = useRouter();
  const [newtitle, setTitle] = useState("")
  const [newdescription, setDescription] = useState("")
  const [newurl, seturl] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api", {
        title: newtitle,
        description: newdescription,
        url: newurl,
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    router.push("/");
  };

  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <h2 className={styles.title}>addMovie</h2>
      <label>title:</label>
      <input onChange={(e) => setTitle(e.target.value)} />
      <label>description:</label>
      <input onChange={(e) => setDescription(e.target.value)} />
      <label>posteurl:</label>
      <input onChange={(e) => seturl(e.target.value)} />
      <button className={styles.btn}> save</button>
      <Link href={"/"} className={styles.btn_return}> return </Link>
    </form>
  );
}

export default addmovie;
