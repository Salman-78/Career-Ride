import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from "../components/Modal";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";
import jogo from "./../assets/jogo.png";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };
  const handleATSCheck = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/atsChecker");
    }
  };


  return (
    <div className="w-full min-h-full bg-white">
      <div className="container mx-auto px-4 py-6 ">
        {/* Header */}
        <header className="flex justify-between items-center mb-16 pb-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
          <img src={jogo} width={150} height={150} />
          {user ? (
            <ProfileInfoCard />
          ) : (
            <button
              className="bg-purple-400 text-sm font-semibold text-white px-7 py-2.5 rounded-lg hover:bg-green-400 hover:text-white transition-colors cursor-pointer"
              onClick={() => setOpenAuthModal(true)}
            >
              Login / Sign Up
            </button>
          )}
        </header>

        {/* Hero Content */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Build Your{" "}
              <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#7182ff_0%,_#3cff52_100%)] bg-[length:200%_200%] animate-text-shine">
                Resume Effortlessly
              </span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Craft a standout resume in minutes with our smart and intuitive
              resume builder.
            </p>
            <div className="flex gap-x-4">
              <button
              className="bg-purple-400 text-base font-semibold text-white px-10 py-4 rounded-lg hover:bg-green-400 transition-colors cursor-pointer"
              onClick={handleCTA}
            >
              Create Resume
            </button>
            <button
              className="bg-purple-400 text-sm font-semibold text-white px-8 py-3 rounded-lg hover:bg-green-400 transition-colors cursor-pointer"
              onClick={handleATSCheck}
            >
              Check ATS score
            </button>
            </div>
          </div>
        </div>

        <section className="mt-5">
          <h2 className="text-2xl font-bold text-center mb-12 text-transparent bg-clip-text bg-[radial-gradient(circle,_#7182ff_0%,_#3cff52_100%)] bg-[length:200%_200%] animate-text-shine">
            Features That Make You Shine
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="bg-gray-50 p-6 rounded-xl shadow-[0_-4px_10px_-2px_rgba(0,0,0,0.2)]  hover:shadow-[0_-6px_20px_2px_rgba(168,85,247,0.6)] 
  transition-shadow duration-500"
            >
              <h3 className="text-lg font-semibold mb-3">Easy Editing</h3>
              <p className="text-gray-600">
                Update your resume sections with live preview and instant
                formatting.
              </p>
            </div>

            <div
              className="bg-gray-50 p-6 rounded-xl shadow-[0_-4px_10px_-2px_rgba(0,0,0,0.2)]  hover:shadow-[0_-6px_20px_2px_rgba(168,85,247,0.6)] 
  transition-shadow duration-500"
            >
              <h3 className="text-lg font-semibold mb-3">
                Beautiful Templates
              </h3>
              <p className="text-gray-600">
                Choose from modern, professional templates that are easy to
                customize.
              </p>
            </div>

            <div
              className="bg-gray-50 p-6 rounded-xl shadow-[0_-4px_10px_-2px_rgba(0,0,0,0.2)]  hover:shadow-[0_-6px_20px_2px_rgba(168,85,247,0.6)] 
  transition-shadow duration-500"
            >
              <h3 className="text-lg font-semibold mb-3">One-Click Export</h3>
              <p className="text-gray-600">
                Download your resume instantly as a high-quality PDF with one
                click.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* <div className="text-sm bg-gray-50 text-secondary text-center p-5 mt-5">
        Made with ❤️... Happy Coding
      </div> */}

      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;
