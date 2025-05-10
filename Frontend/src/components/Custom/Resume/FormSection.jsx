import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import AddPersonalDetails from "./Form/AddPersonalDetails";
import { Button } from "../../ui/button";
import { useContext } from "react";
import { Download, Edit, Edit2 } from "lucide-react";
import editIcon from "../../../assets/Edit.svg"
import AddSummery from "./Form/AddSummery";
import AddExperience from "./Form/AddExperience";
import AddEducation from "./Form/AddEducation";
import AddSkills from "./Form/AddSkills";
//This is used to add/edit details of resume
const FormSection = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  return (
    <div className="overflow-scroll h-screen" id="scrollable-content">
      <div className="flex justify-between border-gray-400 w-[95%] mx-auto">

        <div className="font-bold text-lg flex gap-1">{resumeInfo?.ResumeName} <img src={editIcon} className=" h-5 w-5 cursor-pointer" /></div>


        <div>
          <Button>Download<Download /></Button>
        </div>
      </div>
      {/* PERSONAL DETAILS */}
      <AddPersonalDetails />
      {/* SUMMERY */}
      <AddSummery />
      {/* EXPERIENCE */}
      <AddExperience />
      {/* EDUCATION */}
      <AddEducation />
      {/* SKILLS */}
      <AddSkills />
    </div>
  )
}

export default FormSection;