import style from "./card.module.css";
import Image from "next/image";
import Link from "next/link";
import EditButton from "../Editbutton/EditButton";

function Card({ data}) {
  return (
    <div className={style.MovieCard}>
    <Image
      layout="responsive"
      priority
     src={data.url}
     width={260}
     height={250}
     alt="photo"
    />
   <h1 >{data.title}</h1>
     <EditButton  movie={data}  style={style.btn_edit} />
    </div>
  );
}

export default Card;
