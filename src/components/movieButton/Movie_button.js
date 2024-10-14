"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

function Movie_button({ style,movie }) {

  const { data, status } = useSession();

  return (
       <Link href={status === "authenticated" ?`/movie/${movie._id}`: "/login"}>
            <button className={style}> Watch</button>
          </Link>
  );
}

export default Movie_button;
