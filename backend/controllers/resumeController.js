const fs = require("node:fs");
const path = require("node:path");
const Resume = require("../models/Resume");
const { getATSScore, genAI } = require("../ats");

// @desc    Create a new resume
// @route   POST /api/resumes
// @access  Private
const createResume = async (req, res) => {
  try {
    const { title } = req.body;

    // Default template
    const defaultResumeData = {
      profileInfo: {
        profileImg: null,
        previewUrl: "",
        fullName: "",
        designation: "",
        summary: "",
      },
      contactInfo: {
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
        website: "",
      },
      workExperience: [
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
      education: [
        {
          degree: "",
          institution: "",
          startDate: "",
          endDate: "",
        },
      ],
      skills: [
        {
          name: "",
          progress: 0,
        },
      ],
      projects: [
        {
          title: "",
          description: "",
          github: "",
          liveDemo: "",
        },
      ],
      certifications: [
        {
          title: "",
          issuer: "",
          year: "",
        },
      ],
      languages: [
        {
          name: "",
          progress: 0,
        },
      ],
      interests: [""],
    };

    const newResume = await Resume.create({
      userId: req.user._id,
      title,
      ...defaultResumeData,
    });

    res.status(201).json(newResume);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create resume", error: error.message });
  }
};

// @desc    Get all resumes for logged-in user
// @route   GET /api/resumes
// @access  Private
const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({
      updatedAt: -1,
    });
    res.json(resumes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create resume", error: error.message });
  }
};

// @desc    Get single resume by ID
// @route   GET /api/resumes/:id
// @access  Private
const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json(resume);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create resume", error: error.message });
  }
};

// @desc    Update a resume
// @route   PUT /api/resumes/:id
// @access  Private
const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res
        .status(404)
        .json({ message: "Resume not found or unauthorized" });
    }

    // Merge updates from req.body into existing resume
    Object.assign(resume, req.body);

    // Save updated resume
    const savedResume = await resume.save();

    res.json(savedResume);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create resume", error: error.message });
  }
};

// @desc    Delete a resume
// @route   DELETE /api/resumes/:id
// @access  Private
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res
        .status(404)
        .json({ message: "Resume not found or unauthorized" });
    }

    // Delete thumbnailLink and profilePreviewUrl images from uploads folder
    const uploadsFolder = path.join(__dirname, "..", "uploads");
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    if (resume.thumbnailLink) {
      const oldThumbnail = path.join(
        uploadsFolder,
        path.basename(resume.thumbnailLink)
      );
      if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
    }

    if (resume.profileInfo?.profilePreviewUrl) {
      const oldProfile = path.join(
        uploadsFolder,
        path.basename(resume.profileInfo.profilePreviewUrl)
      );
      if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
    }

    const deleted = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Resume not found or unauthorized" });
    }

    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create resume", error: error.message });
  }
};

function generateResumeText(data) {
  return `Name: ${data.profileInfo.fullName}
Designation: ${data.profileInfo.designation}
Location: ${data.contactInfo.location}
Phone: ${data.contactInfo.phone}
Email: ${data.contactInfo.email}
GitHub: ${data.contactInfo.github}

Summary:\n${data.profileInfo.summary}

Work Experience:\n${data.workExperience
    .map(
      (exp) =>
        `- Company: ${exp.company}\n  Role: ${exp.role}\n  Duration: ${exp.startDate} – ${exp.endDate}\n  Description: ${exp.description}`
    )
    .join("\n")}

Education:\n${data.education
    .map(
      (edu) =>
        `- ${edu.degree}, ${edu.institution} (${edu.startDate} – ${edu.endDate})`
    )
    .join("\n")}

Skills:\n${data.skills.map((s) => `- ${s.name} (${s.progress}%)`).join("\n")}

Projects:\n${data.projects
    .map(
      (p) =>
        `- ${p.title}\n  Description: ${p.description}\n  GitHub: ${p.github}`
    )
    .join("\n")}

Certifications:\n${data.certifications
    .map((c) => `- ${c.title} by ${c.issuer} (${c.year})`)
    .join("\n")}

Languages:\n${data.languages
    .map((l) => `- ${l.name} (${l.progress}%)`)
    .join("\n")}

Interests:\n- ${data.interests.join(", ")}`;
}

const getAts = async (req, res) => {
  const resume = await Resume.findOne({
    _id: req.params.id,
    // userId: req.user._id,
    userId: "6821c1b84fb5e3ff5bcfd914",
  });
  if (!resume) {
    return res.status(404).json({ message: "Resume not found" });
  }
  const text = generateResumeText(resume);

  const atsScore = await getATSScore(text);

  res.json({ atsScore });
};

const reFractor = async (req, res) => {
  const { summary } = req.body;

  const result = await genAI.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Please rewrite and improve this resume summary professionally: Note i will be using this response
        directly in my ai powered resume builder app, so dont include response like "here is the refactored ....." just give the response which can be directly pasted into summry section of resume 
        without any modification. Note also dont make it too long i want the resume to be ats friendly \n${summary}`,
  });
  const improvedSummary = await result.candidates[0].content.parts[0].text;

  res.json({ improvedSummary });
};
module.exports = {
  createResume,
  getAts,
  reFractor,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
};
