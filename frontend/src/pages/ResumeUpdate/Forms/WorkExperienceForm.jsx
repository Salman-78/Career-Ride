import React from 'react'
import { useState } from 'react';
import Input from "../../../components/Inputs/Input";
import { LuPlus, LuTrash2 } from "react-icons/lu";

const WorkExperienceForm = ({ workExperience, updateArrayItem, addArrayItem, removeArrayItem }) => {
  const url = import.meta.env.VITE_APIURI
  const [loadingIndex, setLoadingIndex] = useState(null);
  const refactorWorkExperience = async (index, description) => {
    setLoadingIndex(index);
    try {
      const response = await fetch(`${url}/api/resume/reFractor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ summary: description }), // 👈 Send current description
      });

      const { improvedSummary } = await response.json();

      if (improvedSummary) {
        updateArrayItem(index, "description", improvedSummary); // 👈 Update description
      }
    } catch (error) {
      console.error("Error refactoring work experience:", error);
    } finally {
      setLoadingIndex(null);
    }
  };
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">Work Experience</h2>

      <div className="mt-4 flex flex-col gap-4 mb-3">
        {workExperience.map((experience, index) => (
          <div
            key={index}
            className="border border-gray-200/80 p-4 rounded-lg relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Company"
                placeholder="ABC Corp"
                type="text"
                value={experience.company || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "company", target.value)
                }
              />

              <Input
                label="Role"
                placeholder="Frontend Developer"
                type="text"
                value={experience.role || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "role", target.value)
                }
              />

              <Input
                label="Start Date"
                type="month"
                value={experience.startDate || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "startDate", target.value)
                }
              />

              <Input
                label="End Date"
                type="month"
                value={experience.endDate || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "endDate", target.value)
                }
              />
            </div>

            <div className="mt-4">

              <div className='flex justify-between'>
                <label className="text-sm font-medium text-slate-600 ">
                  Summary
                </label>
                <button
                  type="button"
                  onClick={() => refactorWorkExperience(index, experience.description)}
                  className="mt-1 border border-purple-600 text-purple-600 px-3 py-1 rounded hover:bg-gray-100 transition"
                >
                  {loadingIndex === index ? (
                    <svg
                      className="animate-spin h-4 w-4 text-purple-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                  ) : (
                    "Refactor with AI"
                  )}
                </button>

              </div>
              <textarea
                placeholder="💼 Mention your job role, company name, key responsibilities, and achievements. Just list them freely — our AI will organize them into a professional work summary!"
                className="form-input w-full mt-1"
                rows={3}
                value={experience.description || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "description", target.value)
                }
              />
            </div>

            {workExperience.length > 1 && (
              <button
                type="button"
                className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
                onClick={() => removeArrayItem(index)}
              >
                <LuTrash2 />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"
          onClick={() =>
            addArrayItem({
              company: "",
              role: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
        >
          <LuPlus /> Add Work Experience
        </button>
      </div>
    </div>
  )
}

export default WorkExperienceForm