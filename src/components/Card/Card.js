import React from 'react'
import { Button, MovieCard } from './style'
import Image from 'next/image'
import Link from 'next/link'

function Card({data}) {
  return (
    <MovieCard>
   <Image  
      src={data.url}
      width={500} 
      height={350}  
       layout="responsive" 
       alt="photo"
/>  
    <h1>{data.title}</h1>
 
 <Link href={`/editmovie/${data._id}`}  >  <Button>edit</Button> </Link>  
    </MovieCard>
  )
}

export default Card