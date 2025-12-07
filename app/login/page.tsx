"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LiveInput() {
  const router =useRouter()
  const handleClick = () => {
    router.push("/chat"); // Navigate to /chat
  };
 
  return (
    <>
    
    <div
      style={{width:"100%",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        flexDirection: "column",
        height: "100vh",
        gap: "20px",
      }}
    >
      <Image
        src="/health.avif"
        alt="Logo"
        width={80}
        height={80}
        className="rounded"
      />
      <Link
        style={{ padding: "20px" }}
        href="/"
        className="text-2xl font-bold text-green-900 hover:text-blue-600"
      >
        Health & Medical Service
      </Link>
      <div style={{display:"flex",flexDirection:"row"}}>
      <div style={{width:'50%',height:"50vh",
        
         display: "flex",
        justifyContent: "center",
        padding:"20px",
        flexDirection: "column",
      }}> 
      <h1 style={{color:"#0f4d7d",fontSize:"20px"}}>File</h1>
      <h1 style={{color:"#124063",fontWeight:'bold',fontSize:"23px"}}>Upload</h1>
      <p style={{color:"gray",fontSize:"12px",
        paddingTop:'10px'
      }}>"Welcome! Here you can upload your files easily by clicking the upload button, dragging and dropping, selecting from your device, and sharing or syncing them securely."</p>
      <button onClick={handleClick}
      style={{borderRadius:"20px",border:"red solid 1px",
        padding:"10px",margin:"10px", background: "linear-gradient(45deg, #ff416c, #7a3023ff)",
        cursor:"pointer",
      }}>Read More</button>
      </div>
      <div style={{width:'50%', height:"50vh",
        display: "flex",
        justifyContent: "center",
        alignItems:'center'
      }}>
        <img src="/OIP.webp"
        style={{width:"100%",
          height:"50%"
        }}/>
      </div></div>
    
    </div>
    </>
  );
}
