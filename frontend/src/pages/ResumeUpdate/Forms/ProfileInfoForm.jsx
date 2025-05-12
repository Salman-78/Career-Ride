import React, { useState } from 'react'
import ProfilePhotoSelector from "../../../components/Inputs/ProfilePhotoSelector";
import Input from "../../../components/Inputs/Input";
import { LoaderCircle } from "lucide-react";

const ProfileInfoForm = ({ profileData, updateSection }) => {
  const url = import.meta.env.VITE_APIURI
  const [loading, setLoading] = useState(false);
  const refactorSummary = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/resume/reFractor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ summary: profileData.summary }),
      });

      const { improvedSummary } = await response.json();

      if (improvedSummary) {
        updateSection("summary", improvedSummary);
      }
    } catch (error) {
      console.error("Error refactoring summary:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">
        Personal Information
      </h2>

      <div className="mt-4">
        <ProfilePhotoSelector
          image={profileData?.profileImg || profileData?.profilePreviewUrl}
          setImage={(value) => updateSection("profileImg", value)}
          preview={profileData?.profilePreviewUrl}
          setPreview={(value) => updateSection("profilePreviewUrl", value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            value={profileData.fullName || ""}
            onChange={({ target }) => updateSection("fullName", target.value)}
            label="Full Name"
            placeholder="John"
            type="text"
          />

          <Input
            value={profileData.designation || ""}
            onChange={({ target }) =>
              updateSection("designation", target.value)
            }
            label="Designation"
            placeholder="UI Designer"
            type="text"
          />

          <div className="col-span-2 mt-3">
            <div className='flex justify-between'>
              <label className="text-sm font-medium text-slate-600 ">
                Summary
              </label>
              <button
                type="button"
                onClick={refactorSummary}
                className="mt-1 border border-purple-600 text-purple-600 px-3 py-1 rounded hover:bg-gray-100 transition"
              >
                {loading ? (
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
              placeholder="✨ Write a few unordered points about your experience, skills, or goals. Don't worry about structure — our AI will refactor (reorganize and improve) your content into a polished professional summary! "
              className="form-input"
              rows={4}
              value={profileData.summary || ""}
              onChange={({ target }) => updateSection("summary", target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfoForm