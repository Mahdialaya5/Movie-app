"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

function Delete_button({ movie, style }) {
    
  const { data, status } = useSession();
  const router=useRouter()

  const handleClick = () => {

    const validator=confirm('you sure for delete')
     if (validator) {
        axios
        .delete(`/api/movie/${movie._id}`)
        .then((res) => router.push('/'))
        .catch((err) => {
          setErr(err.response);
          return Promise.reject(err);
        });
     }};

  return (
    <>
      {status === "authenticated" && data.user.role == "admin" ? (
        <button className={style} onClick={handleClick}>
          delete
        </button>
      ) : null}
    </>
  );
}

export default Delete_button;
