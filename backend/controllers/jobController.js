import User from "../models/userModel";
import Job from "../models/jobModel";

// public routes for appicants

const getallJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).populate("postedBy", "name");
    return res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getjobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "postedBy",
      "name companyName"
    );
    if (!job) {
      return res.status(404).json({ message: "Job not found buddy !!" });
    }
  } catch (error) {
    return res.status(404).json({ message: "Server Error" });
  }
};

// Ye sarre protected routes h recruiter ke liye

const createJob = async (req, res) => {
  try {
    const { title, description, companyName, location, salary, jobType } =
      req.body;

    const job = await Job.create({
      title,
      description,
      companyName,
      location,
      salary,
      jobType,
      postedBy: req.user.id, // Link the job to the logged-in recruiter
    });
    res.status(201).json(job);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating job", error: error.message });
  }
};


const getMyJobs = async()
