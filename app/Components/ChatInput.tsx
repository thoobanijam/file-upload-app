"use client";

import { useState } from "react";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  // Handle file uploads
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const uploadedFiles = Array.from(e.target.files);
    setFiles([...files, ...uploadedFiles]);
  };

  // Remove a file
  const removeFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  // Handle sending message
  const handleSend = () => {
    if (!message && files.length === 0) return;

    console.log("Message:", message);
    console.log("Files:", files);

    // Clear input after sending
    setMessage("");
    setFiles([]);
  };

  return (
    <div className="w-full fixed bottom-0 left-0 bg-white border-t p-4 flex flex-col items-center">

      {/* Uploaded files preview */}
      {files.length > 0 && (
        <div className="flex gap-3 flex-wrap mb-3">
          {files.map((file, index) => (
            <div key={index} className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-xl">
              <span className="text-sm font-medium">
                {file.name.length > 15 ? file.name.slice(0, 15) + "..." : file.name}
              </span>
              <button onClick={() => removeFile(index)} className="text-red-600 font-bold">
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Chat input area */}
      <div className="flex items-center w-full max-w-3xl bg-gray-100 rounded-2xl px-4 py-3 shadow-md">

        {/* File upload button */}
        <label className="cursor-pointer text-xl">
          <input
            type="file"
            className="hidden"
            multiple
            onChange={handleFileUpload}
            accept="image/*,video/*,.pdf,.doc,.docx,.pptx"
          />
          📎
        </label>

        {/* Text input */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message…"
          className="flex-1 bg-transparent outline-none px-3"
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          className="text-white bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
