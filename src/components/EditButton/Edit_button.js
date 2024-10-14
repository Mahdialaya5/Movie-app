'use client'
import {useSession } from "next-auth/react";
import Link from 'next/link'
import React from 'react'

function Edit_Button({movie,style}) {

    const {data, status}= useSession()
 
  return (  <>
   {status==='authenticated' && data.user.role=='admin' ?  <Link href={`/editmovie/${movie._id}`}>
   <button className={style}>edit</button>
   </Link> :null}
   </>
  )
}

export default Edit_Button