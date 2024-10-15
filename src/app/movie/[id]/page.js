import Navbar from "@/components/Navbar/Navbar";
import Movie from "@/components/movie/Movie";
import axios from "axios";

export default async function Home({ params }) {


  const { id } = params

  try {
    const response = await axios.get(`${process.env.Base_url}/api/movie/${id}`)
    var movie = response.data.movie
  
  } catch (error) {
    alert(error)
  }

  return (
    <>
      <Navbar />
      <Movie movie={movie} />
    </>
  );
}