import { useEffect, useRef, useState } from "react";
import parse, { domToReact } from "html-react-parser";
import EmailEditor from "react-email-editor";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmailTemplated,
  removeEmailTemplated,
} from "../services/redux/slice/emailEditorSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { setSelectTem } from "../services/redux/slice/selectTemSlice";

export default function Editor() {
  //=========== style ===============//

  const router = useRouter();

  const dispatch = useDispatch();
  const emailEditorRef = useRef(null);
  const selectItem = useSelector((state: any) => state?.selectTem.selectTem);
  console.log(selectItem)

  /*   useEffect(() => {
    const data = localStorage.getItem("nn");
    setTemplated(data);
  }, [router.pathname]); */

  




  //======================= Save design  ===============================//
  function saveDesign() {
    emailEditorRef.current.editor.saveDesign((design) => {
      // ====== set templated on localStor =========== //
      localStorage.setItem("templated", JSON.stringify(design));
    });
  }

  //======================= Export Html  ===============================//
  function exportHtml() {
    emailEditorRef.current.editor.exportHtml(async(data) => {
      const { design, html } = data;
      const saveTem  = await axios.post("http://localhost:3000/api/createTem", {
        data: {
         design ,
         html ,
         id: selectItem.id
        },
      })
      dispatch(setSelectTem({design, html , id: selectItem.id}))
      console.log(saveTem)

      // dispatch(setEmailTemplated({design , html}));
      // localStorage.setItem("templated", JSON.stringify({html , design}));

    });
  }

  //======================= OneLoad editor  ===============================//
  function onLoad() {
       emailEditorRef?.current?.editor?.registerCallback(
      "image",
      function (file, done) {
        /* console.log("HI hi ");
        console.log(file);
        console.log(done); */
        // Do something to upload the image and return the URL of the uploaded image
        done({
          url: "https://static.javatpoint.com/computer/images/what-is-the-url.png",
        });
      }
    );
    
  }

  //======================= Ready editor and load design ===============================//
  function onReady() {
    emailEditorRef.current?.editor?.loadDesign(selectItem.design); 
  
  }

  const userList = [
    {name: "sagor" , email:"jaminurislam250@gmail.com"},
    {name: "softenin" , email:"dev.softenin@gmail.com"},
  ]
  const destination = userList.map(user =>{
    return {
      Destination: {
        ToAddresses:[
          user.email
        ]},
        ReplacementTemplateData: JSON.stringify({name: user.name , favoriteanimal: user.email})
      
    }
  })
  console.log(destination)

    //======================= Send Email ===============================//
    const sendEmail = async () => {
      if(selectItem.html){
        const tem = await axios.post("http://localhost:3000/api/send_multiple_email_api", {
        data: {
          senderEmail: "sheikhanikbd@gmail.com",
          destination: destination ,
          templated: selectItem.html
        },
      });
       console.log(tem)
      }else{
        alert("Please save this templated")
      }
    };

    //======================= Delete template ==============================//
    const deleteTem = async () =>{ 
      if(selectItem?.id){
        const delTem  = await axios.post("http://localhost:3000/api/delTem", {
          data: {
            id: selectItem.id
          }
        })
        dispatch(setSelectTem({}))
        console.log(delTem)

        }else{
        console.log("not found")
      }
      
     
    }

  return (
    <div>
      <div>
        <div>
          <button onClick={()=> dispatch(setSelectTem({}))} style={{ marginRight: "60px" }}>
            <Link href="/showlist">All templated</Link>
          </button>
         {/*  <button
            style={{ marginRight: "30px" }}
            onClick={() => dispatch(removeEmailTemplated())}
          >
            Remove design
          </button>
          <button style={{ marginRight: "30px" }} onClick={saveDesign}>
          Save Design
          </button> */}
          <button style={{ marginRight: "30px" }} onClick={()=>{
            deleteTem()
            // localStorage.removeItem("templated")
          }}>
           Delete 
          </button> 
          <button style={{ marginRight: "60px" }} onClick={exportHtml}>
            {/* Export HTML */}
            Save Design
          </button>
          <button onClick={sendEmail}> Send Email</button>
        </div>

        <div className="h-screen overflow-hidden">
          <EmailEditor
            projectId={1}
            ref={emailEditorRef}
            onLoad={onLoad}
            onReady={onReady}
       

            // tools={customTol}
          />
        </div>
      </div>
    </div>
  );
}










 /* 
 [     
       {        "Destination":{
                "ToAddresses":[
                  "jaminurislam250@gmail.com"
                ]
              },
              "ReplacementTemplateData":"{ \"name\":\"jaminur\", \"favoriteanimal\":\"angelfish\""
            },
            {
              "Destination":{ 
                "ToAddresses":[
                  "dev.softenin@gmail.com"
                ]
              },
              "ReplacementTemplateData":"{ \"name\":\"softenin\", \"favoriteanimal\":\"lion\" }"
        },
    ], 
  
  */
