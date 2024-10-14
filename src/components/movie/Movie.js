import React from "react";
import style from './movie.module.css'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

async function Movie({ movie }) {

  const session= await getServerSession(authOptions)

  return (
    <>
    {session ?
        <div className={style.container}>
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
          <iframe
            width="760"
            height="415"
            src={movie.src}
            allowFullScreen='true'
          ></iframe>
        </div>
       : null }
    </>
  )
}

export default Movie;
