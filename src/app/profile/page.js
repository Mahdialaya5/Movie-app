import style from "./profile.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Navbar from "@/components/Navbar/Navbar";
import Edituser from "@/components/Edituser/Edituser";

  async function  Profile() {

   
    const session= await getServerSession(authOptions)
     
       
  return (
  <>
      <Navbar/>
     {session ? <>
      <p   className={style.user}  > name: {session.user.name}</p>
      <p   className={style.user}  > Email : {session.user.email}</p> 
      <Edituser   user={session.user}  />
     </>
     : null } 
      </>
  );
}

export default Profile;
