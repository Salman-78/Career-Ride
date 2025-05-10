/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import resumeEg from "../../../assets/resume_eg.jpg";
import { AuthContext } from "../../../provider";
import Header from "../Header";
import AddResumsCard from "./AddResumsCard";
import ResumeListCard from "./ResumeListCard";
import { Button } from "@/components/ui/button"

const Dashboard = () => {
  const navigate = useNavigate();

  const { loggedIn } = useContext(AuthContext);
  // if (!loggedIn) return navigate("/auth");
  return (
    <>
      <Header />
      <div className="p-12 md:px-20 lg:px-32">
        <h2 className="font-bold text-4xl text-gray-800">My Resumes</h2>
        <p className="pt-3 text-xl text-gray-600 px-2">
          Create AI powered Resumes to land a job
        </p>
        <div className="flex gap-4">
          <AddResumsCard />
          {/* <ResumeListCard img={resumeEg} />
          <ResumeListCard img={null} />
          <ResumeListCard img={null} />
          <ResumeListCard img={null} /> */}
          {/* grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
