import style from "./card.module.css";
import Image from "next/image";
import Link from "next/link";

function Card({ data, token }) {
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

      <h1     >{data.title}</h1>
     {token ? 
        <Link href={`/editmovie/${data._id}`}>
        <button className={style.btn_edit}>edit</button>
        </Link>: null}
    </div>
  );
}

export default Card;
