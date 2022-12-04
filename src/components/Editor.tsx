import { useEffect, useRef, useState } from "react";



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

export default function Editor() {
  //=========== style ===============//

  const router = useRouter();

  const dispatch = useDispatch();
  const emailEditorRef = useRef(null);
  const allTem = useSelector(
    (state: any) => state?.emailTemplatedList?.emailTemplatedList
  );

  /*   useEffect(() => {
    const data = localStorage.getItem("nn");
    setTemplated(data);
  }, [router.pathname]); */

  let htmlDesign;

  //======================= Send Email ===============================//
  const sendEmail = () => {
    axios.post("http://localhost:3000/api/send_email_api", {
      data: {
        senderEmail: "sheikhanikbd@gmail.com",
        receiverEmailList: ["jaminurislam250@gmail.com"],
        templated: allTem[0],
      },
    });
  };

  //======================= Save design  ===============================//
  function saveDesign() {
    emailEditorRef.current.editor.saveDesign((design) => {
      // ====== set templated on localStor =========== //
      localStorage.setItem("nn", JSON.stringify(design));
    });
  }

  //======================= Export Html  ===============================//
  function exportHtml() {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log(html);
      // console.log(design);
      // console.log(html);

      // ====== set templated on redux =========== //

      dispatch(setEmailTemplated(`${html}`));
      // console.log("exportHtml", html);
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
    // editor instance is created
    // you can load your template here;
    htmlDesign = localStorage.getItem("nn");
    emailEditorRef.current?.editor?.loadDesign(JSON.parse(htmlDesign));
  }

  //======================= Ready editor ===============================//
  function onReady() {
    // editor is ready
    console.log("onReady");
    emailEditorRef.current?.editor?.loadDesign(JSON.parse(htmlDesign));
  }

  return (
    <div>
      <div>
        <div>
          <button style={{ marginRight: "60px" }}>
            <Link href="/showlist">All templated</Link>
          </button>
          <button
            style={{ marginRight: "30px" }}
            onClick={() => dispatch(removeEmailTemplated())}
          >
            Remove design
          </button>
          <button style={{ marginRight: "30px" }} onClick={saveDesign}>
            Save Design
          </button>
          <button style={{ marginRight: "60px" }} onClick={exportHtml}>
            Export HTML
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
