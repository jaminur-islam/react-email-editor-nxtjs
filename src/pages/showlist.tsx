import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmailTemplated } from "../services/redux/slice/emailEditorSlice";

const ShowTemplated = dynamic(() => import("../components/ShowTemplated"), {
  ssr: false,
});
export default function showlist() {
  const allTemplated = useSelector((state: any) => state?.emailTemplatedList?.emailTemplatedList); 
  const dispatch = useDispatch()
  useEffect(()=>{
     axios.get("http://localhost:3000/api/getTem").then(res => {
      dispatch(setEmailTemplated(res.data));
     }) 
    
  },[])
  console.log(allTemplated)
  return (
    <>
      <h1>show list of templated </h1>
      {allTemplated?.map((tem) => {
         const parseTem = JSON.parse(tem.emailTem)
         parseTem.id = tem.id
        return <ShowTemplated key={parseTem.id} emailTem={parseTem} />;
      })}
    </>
  );
}
