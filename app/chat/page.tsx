"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";



export default function LiveInput() {
  const [text, setText] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const uploadedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...uploadedFiles]);
  };

  const handleSend = () => {
    console.log("Text:", text);
    console.log("Files:", files);
    setText(""); // clear input
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div
      style={{
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

      {/* Input with + and upload arrow */}
      <div style={{ position: "relative", width: "500px",}}>
        {/* + Button */}
        <label
          htmlFor="fileUpload"
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            fontSize: "25px",
            color: "gray",
           
          }}
        >
          +
        </label>
        <input
          id="fileUpload"
          type="file"
          multiple
          accept="image/*,video/*,.pdf,.doc,.docx"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />

        {/* Text input */}
      <div style={{ display: "flex", alignItems: "center", width: "100%", gap: "10px" }}>
  {/* Input */}
  <input
    type="text"
    placeholder="Type here..."
    value={text}
    onChange={handleChange}
    style={{
      flex: 1, // takes all remaining width
      padding: "10px 15px 10px 35px",
      borderRadius: "20px",
      border: "1px solid gray",
      color: "black",
      fontSize: "14px",
      boxSizing: "border-box",
 
    }}
  />

  {/* Analysis Button */}
  <button
    onClick={handleSend}
    style={{
      background: "#00c950",
      border: "1px solid #00c950",
      cursor: "pointer",
      fontSize: "14px",
      color: "white",
      padding: "10px 20px",
      borderRadius: "20px",
      whiteSpace: "nowrap",
    }}
  >
    Analysis
  </button>
</div>


      </div>

      {/* File previews as cards */}
      {files.length > 0 && (
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", width: "500px" }}>
          {files.map((file, idx) => {
            const isImage = file.type.startsWith("image/");
            const fileURL = URL.createObjectURL(file);

            return (
              <div
                key={idx}
                style={{
                  position: "relative",
                  width: "100px",
                  height: "100px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  border: "1px solid gray",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f0f0f0",
                  cursor: "pointer",
                }}
              >
                {/* Delete button */}
                <button
                  onClick={() => removeFile(idx)}
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    background: "rgba(0,0,0,0.5)",
                    border: "none",
                    color: "white",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    textAlign: "center",
                    lineHeight: "18px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  ×
                </button>

                {/* File preview */}
                {isImage ? (
                  <img
                    src={fileURL}
                    alt={file.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div style={{ textAlign: "center", fontSize: "12px", padding: "5px" }}>
                    {file.name.length > 10
                      ? file.name.slice(0, 7) + "..."
                      : file.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
