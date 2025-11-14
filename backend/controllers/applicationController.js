import Application from "../models/applicationModel";
import Job from "../models/jobModel";

const applyForjob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applicantId = req.user.id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(401).json({ message: "Job not found" });
    }
    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: applicantId,
    });

    if (alreadyApplied) {
      return res
        .status(401)
        .json({ message: "You have already applied for this job!!" });
    }
    const application = await Application.create({
      job: jobId,
      applicant: applicantId,
      status: "Pending Bro",
    });
    return res.status(201).json(application);
  } catch (error) {
    return res.status(401).json({ message: "Error in apply for Job" });
  }
};

const getMyApplication = async (req, res) => {
 try {
   const applicantId= req.user.id
 
   const applications = await Application.findOne({
     applicant:applicantId,
 
   })
      .populate('job', 'title companyName location jobType salary')
   return res.status(200).json(applications )
 } catch (error) {
     return res
      .status(500)
      .json({ message: 'Server error' });
 }
};


