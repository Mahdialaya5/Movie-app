import style from "./card.module.css";
import Image from "next/image";
import Edit_button from "../EditButton/Edit_button";
import Movie_button from "../movieButton/Movie_button";
import Delete_button from "../DeleteButton/Delete_button";


async function Card({data}) {
    
  return (
    <div className={style.MovieCard}>
    <Image  
      responsive="true"
      priority
     src={data.url || '/icon.png'}
     width={272}
     height={388}
     alt={data.title}
     
    />
   <h1 >{data.title}</h1>
    <div  className={style.btns} >
     <Edit_button  movie={data}  style={style.btn_edit} />
     <Delete_button movie={data} style={style.btn_delete}    />
     <Movie_button style={style.btn_movie} movie={data} />
     </div>
    </div>
  );
}

export default Card;
