"use client";
import React, { useEffect, useState } from "react";
import style from "./userlist.module.css";
import axios from "axios";
import { useSession } from "next-auth/react";

function Userlist() {

  const [users, setusers] = useState([])
  const {data, status}= useSession()

    useEffect(() => {
        axios
        .get(`${process.env.Base_url}/api/user/get`)
        .then((res) => setusers(res.data.users))
        .catch((err) =>alert(err.response.data.msg) );

    }, [])
    


  return (
    <div className={style.container}>
      {
        status === 'loading' ? null : 
        status === 'authenticated' ? 
     <>
      <h2 className={style.title}>User List</h2>
      <table className={style.table}>
        <thead className={style.thead}>
          <tr className={style.tr}>
            <th className={style.th}>Email</th>
            <th className={style.th}>Username</th>
          </tr>
        </thead>
        <tbody>
         {users&&users.map((el)=><tr className={style.tr}>
            <td className={style.td}>{el.email}</td>
            <td className={style.td}>{el.name}</td>
          </tr>) }
      </tbody>
      </table> 
      </>:null }
    </div>
  );
}

export default Userlist;
