import React from "react";
import Input from "../../../components/Inputs/Input";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import { useState } from "react";

const ProjectsDetailFrom = ({
  projectInfo,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  const url = import.meta.env.VITE_APIURI
  const [loadingIndex, setLoadingIndex] = useState(false);
  const refactorProjectDescription = async (index, description) => {
    setLoadingIndex(index);
    try {
      const response = await fetch(`${url}/api/resume/reFractor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  summary: `Refactor this project description to be more professional and concise.
   Give only one improved version. Do not include options:
   Note this is project description not summary${description}`
}),
      });

      const { improvedSummary } = await response.json();
      if (improvedSummary) {
        updateArrayItem(index, "description", improvedSummary);
      }
    } catch (error) {
      console.error("Error refactoring project description:", error);
    } finally {
      setLoadingIndex(null);
    }
  };
  return <div className="px-5 pt-5">
    <h2 className="text-lg font-semibold text-gray-900">Projects</h2>

    <div className="mt-4 flex flex-col gap-4 mb-3">
      {projectInfo.map((project, index) => (
        <div
          key={index}
          className="border border-gray-200/80 p-4 rounded-lg relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2">
              <Input
                label="Project Title"
                placeholder="Portfolio Website"
                type="text"
                value={project.title || ""}
                onChange={
                  ({ target }) =>
                    updateArrayItem(index, "title", target.value)
                }
              />
            </div>

            <div className="col-span-2">
              {/*  */}
              <div className="flex justify-between mb-1">
                <label className="text-xs font-medium text-slate-600">
                  Description
                </label>
                <button
                  type="button"
                  onClick={() => refactorProjectDescription(index, project.description)}
                  className="text-purple-600 border border-purple-600 text-xs px-2 py-1 rounded hover:bg-gray-100 transition"
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
              {/*  */}
              <textarea
                placeholder="Short description about the project"
                className="form-input w-full mt-1"
                rows={3}
                value={project.description || ""}
                onChange={
                  ({ target }) =>
                    updateArrayItem(index, "description", target.value)
                }
              />
            </div>

            <Input
              label="GitHub Link"
              placeholder="https://github.com/username/project"
              type="url"
              value={project.github || ""}
              onChange={({ target }) =>
                updateArrayItem(index, "github", target.value)
              }
            />

            <Input
              label="Live Demo URL"
              placeholder="https://yourproject.live"
              type="url"
              value={project.liveDemo || ""}
              onChange={({ target }) =>
                updateArrayItem(index, "liveDemo", target.value)
              }
            />
          </div>

          {projectInfo.length > 1 && (
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
            title: "",
            description: "",
            github: "",
            liveDemo: "",
          })
        }
      >
        <LuPlus /> Add Project
      </button>
    </div>
  </div>
};

export default ProjectsDetailFrom;
