"use client";
import React,{ useState} from "react";
import style from './Edit.module.css'
import axios from "axios";


function Edituser({user}) {

  
  const [newpassword, setnewpassword] = useState("");
  const [editpassword, setEditpassword] = useState(false);
  const [edit, setEdit] = useState(false);

   const handleSubmit=(e)=>{
      e.preventDefault()
     
      if (newpassword) {
        if (newpassword.length<6) {
          return alert('password should be 6 charactares')
       }
          axios.patch(`http://localhost:3000/api/user/edit/${user.id}`, {
              newpassword
            })
            .then(() =>  window.location.reload())
            .catch((err) => console.log(err))
           }}
   

  return (
    <>
      <button  className={style.btn} onClick={() => setEdit(!edit)}>Edit</button>
      {edit ? 
        <div>
          <button    className={style.btn}  onClick={() => setEditpassword(!editpassword)}  >
            Edit Password
          </button>
        </div>
        :null}
       {edit&&editpassword ? <form  onSubmit={handleSubmit}   className={style.form}  >
          <input placeholder='edit password' type="password"  onChange={(e)=>setnewpassword(e.target.value)} />
          <button  type='onsubmit' className={style.submit}  >save</button>
       </form>
        :null}
    </>
  );
}

export default Edituser;
