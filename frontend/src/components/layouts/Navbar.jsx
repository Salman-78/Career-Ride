import React from "react";
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";
import jogo from "../../assets/jogo.png";

const Navbar = () => {
  return <div className="shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] h-16 bg-white border boredr-b border-gray-200/50 backdrop-blur-[2px] py-2.5 px-4 md:px-0 sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between gap-5">
        <Link to='/dashboard'>
          <img src={jogo} width={150} height={150} />
        </Link>
        <ProfileInfoCard />
      </div>
    </div>
};

export default Navbar;
