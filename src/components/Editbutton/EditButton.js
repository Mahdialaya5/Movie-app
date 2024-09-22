'use client'
import {useSession } from "next-auth/react";
import Link from 'next/link'
import React from 'react'

function EditButton({movie,style}) {

    const {data, status}= useSession()

  return (  <>
   {status==='authenticated' ?  <Link href={`/editmovie/${movie._id}`}>
   <button className={style}>edit</button>
   </Link> :null}
   </>
  )
}

export default EditButton