import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

import { Dropzone } from "./Dropzone";

const apiurl = import.meta.env.VITE_APIURI;

export default function UploadNotes() {
  const [pdf, setPdf] = useState(null);

  const [loading, setloading] = useState(false);

  const onDrop = (acceptedFile) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPdf({ src: reader.result, file: acceptedFile });
    };
    reader.readAsDataURL(acceptedFile);
  };

  const handleDeleteImage = () => {
    setPdf(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!pdf?.file) {
      toast("Please fill all fields and upload an image.");
      return;
    }
    setloading(true);
    const formData = new FormData();
    formData.append("resume", pdf.file);

    const uploadResponse = await fetch(`${apiurl}/pdf_ats`, {
      method: "POST",
      body: formData,
    });

    setloading(false);

    const { atsScore } = await uploadResponse.json();

    toast.success(`🎉 Your ATS score is ${atsScore}!`, {
      position: "top-center",
      autoClose: 5000,
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        background: "#e0f7fa",
        color: "#00796b",
        borderRadius: "10px",
        padding: "16px",
      },
      icon: "✅",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center justify-center min-h-screen bg-gray-50 p-4"
    >
      <div className="w-full max-w-lg p-8 bg-purple-100 text-gray-900 rounded-xl shadow-lg border border-gray-300">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Upload Written Notes
        </h2>
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Upload Notes PDF
              </label>
              <Dropzone onDrop={onDrop} accept="application/pdf" />
            </div>
          </div>
          {pdf && (
            <div className="gallery-item relative mt-4">
              <embed
                src={pdf.src}
                type="application/pdf"
                className="w-full h-96 rounded-lg shadow-md"
              />
              <button
                type="button"
                onClick={handleDeleteImage}
                className="absolute top-[-15] right-[-15] bg-red-500 text-white rounded-md p-2 text-sm"
              >
                <Trash2 size={20} />
              </button>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-400 hover:bg-green-400 text-white py-3 rounded-lg shadow-md"
          >
            {loading ? "loading..." : "Upload"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
