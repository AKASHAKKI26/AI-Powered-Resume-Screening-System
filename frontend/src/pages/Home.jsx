import { useState } from "react";

import axios from "axios";

import { motion } from "framer-motion";

import { FaUpload } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Home() {

  // States

  const [files, setFiles] = useState([]);

  const [jobDescription, setJobDescription] = useState("");

  const navigate = useNavigate();

  // Analyze Resume Function

  const analyzeResume = async () => {

    if (files.length === 0) {

      alert("Please upload resumes");

      return;
    }

    const formData = new FormData();

    files.forEach((file) => {

      formData.append("files", file);

    });

    try {

      const response = await axios.post(

        `https://ai-powered-resume-screening-system-rpak.onrender.com/upload-resume/?job_description=${jobDescription}`,

        formData

      );

      // Navigate to Candidate Page

      navigate("/candidate", {

        state: {

          results: response.data

        }

      });

    }

    catch (error) {

      console.log(error);

      alert("Error analyzing resumes");

    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white relative overflow-hidden">

      {/* Animated Background */}

      <div className="absolute inset-0 overflow-hidden -z-10">

        {/* Cyan Glow */}

        <div

          className="absolute w-[600px] h-[600px] bg-cyan-500/30 rounded-full blur-3xl"

          style={{

            top: "-150px",

            left: "-150px",

            animation: "float1 8s ease-in-out infinite"

          }}

        ></div>

        {/* Purple Glow */}

        <div

          className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"

          style={{

            bottom: "-100px",

            right: "-100px",

            animation: "float2 10s ease-in-out infinite"

          }}

        ></div>

        {/* Blue Glow */}

        <div

          className="absolute w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl"

          style={{

            top: "40%",

            left: "40%",

            animation: "float3 12s ease-in-out infinite"

          }}

        ></div>

      </div>

      {/* Navbar */}

      <div className="border-b border-zinc-800 p-6 flex justify-center">

        <h1 className="text-5xl font-bold text-cyan-400">

          AI-Powered Resume Screening System

        </h1>

      </div>

      {/* Main Content */}

      <div className="flex items-center justify-center min-h-[85vh] px-6">

        <motion.div

          initial={{ opacity: 0, y: 30 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.6 }}

          className="w-full max-w-3xl bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-zinc-800 shadow-2xl"

        >

          {/* Heading */}

          <h2 className="text-3xl font-bold mb-8 text-center">

            Upload Candidate Resumes

          </h2>

          {/* Upload Box */}

          <label className="border-2 border-dashed border-cyan-500 rounded-3xl p-14 flex flex-col items-center cursor-pointer hover:bg-zinc-800/40 transition-all duration-300">

            <FaUpload className="text-6xl text-cyan-400 mb-6" />

            <p className="text-xl text-zinc-300">

              {

                files.length > 0

                  ? `${files.length} resumes selected`

                  : "Upload PDF/DOCX Resumes"

              }

            </p>

            <input

              type="file"

              multiple

              className="hidden"

              onChange={(e) =>

                setFiles(Array.from(e.target.files))

              }

            />

          </label>

          {/* Job Description */}

          <textarea

            placeholder="Paste Job Description Here..."

            className="w-full mt-8 bg-zinc-900/80 border border-zinc-700 rounded-3xl p-6 h-64 outline-none focus:border-cyan-400 text-lg"

            value={jobDescription}

            onChange={(e) =>

              setJobDescription(e.target.value)

            }

          />

          {/* Analyze Button */}

          <button

            onClick={analyzeResume}

            className="w-full mt-8 bg-cyan-500 hover:bg-cyan-600 py-5 rounded-3xl text-xl font-bold transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-cyan-500/20"

          >

            Analyze Resumes

          </button>

        </motion.div>

      </div>

    </div>
  );
}

export default Home;