import styles from "./profile.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Navbar from "@/components/Navbar/Navbar";

  async function  Profile() {


    const session= await getServerSession(authOptions)
  
  return (
  <>
      <Navbar/>
     {session ? <p>Email : {session.user.email}</p> : null } 
      </>
  );
}

export default Profile;
