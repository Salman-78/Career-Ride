/* eslint-disable no-unused-vars */
import { useContext } from "react"
import { ResumeInfoContext } from "../../../context/ResumeInfoContext"
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummaryPreview from "./preview/SummaryPreview";
import ProfessionalExperience from "./preview/ExperiencePreview";
import EducationPreview from "./preview/EducationPreview";
import SkillsPreview from "./preview/SkillsPreview";

const ResumePreviewSection = () => {

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  return (
    <div className=" shadow-lg h-screen p-14 border-t-[20px] overflow-scroll" id="scrollable-content">
      {/* personal details */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      {/* Summery */}
      <SummaryPreview resumeInfo={resumeInfo} />
      {/* Profession Experience */}
      <ProfessionalExperience resumeInfo={resumeInfo} />
      {/* Education section */}
      <EducationPreview resumeInfo={resumeInfo} />
      {/* Skills */}
      <SkillsPreview resumeInfo={resumeInfo} />
    </div>
  )
}

export default ResumePreviewSection