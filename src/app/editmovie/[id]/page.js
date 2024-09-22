"use client";
import React, { useEffect, useState } from "react";
import styles from "./edit.module.css";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";


function Editmovie() {
  const [EditTitle, setTitle] = useState("");
  const [EditDescription, setDescription] = useState("");
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api")
      .then((response) => {
        const obj = response.data.movies.find((el) => el._id === id);
        if (obj) {
          setTitle(obj.title);
          setDescription(obj.description);
        }
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:3000/api/product/${id}`, {
        title: EditTitle,
        description: EditDescription,
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    router.push("/");
  };

  return (

      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Edit Movie</h2>
        <label>Title</label>
        <input value={EditTitle} onChange={(e) => setTitle(e.target.value)} />
        <label>Description</label>
        <input
          value={EditDescription}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className={styles.btn}>Save</button>
        <Link href={"/"} className={styles.btn_return}>
          Return
        </Link>
      </form>
   
  );
}

export default Editmovie;
