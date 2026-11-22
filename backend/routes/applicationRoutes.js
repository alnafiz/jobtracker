const express = require("express");
const Application = require("../models/Application"); // Application model import
const protect = require("../middleware/authMiddleware"); // JWT verification middleware

const router = express.Router();

// Shob application route-ei JWT token lagbe
router.use(protect);

// GET /api/applications — Logged-in user-er shob application dekha
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(applications);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch applications", error: error.message });
  }
});

// POST /api/applications — Notun application add kora
router.post("/", async (req, res) => {
  try {
    const { company, role, status, location, jobLink, notes, appliedDate } =
      req.body;

    if (!company || !role) {
      return res.status(400).json({ message: "Company and role are required" });
    }

    const application = await Application.create({
      userId: req.userId,
      company: company.trim(),
      role: role.trim(),
      status: status || "Applied",
      location: location ? location.trim() : "",
      jobLink: jobLink ? jobLink.trim() : "",
      notes: notes ? notes.trim() : "",
      appliedDate: appliedDate || Date.now(),
    });

    res.status(201).json(application);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create application", error: error.message });
  }
});

// PUT /api/applications/:id — Nijer application update kora
router.put("/:id", async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this application" });
    }

    // Shudhu permitted field-gulo pick kore update kora hocche (userId overwrite bondho)
    const allowedUpdates = {};
    if (req.body.company !== undefined) {
      allowedUpdates.company = req.body.company.trim();
    }
    if (req.body.role !== undefined) {
      allowedUpdates.role = req.body.role.trim();
    }
    if (req.body.status !== undefined) {
      allowedUpdates.status = req.body.status;
    }
    if (req.body.location !== undefined) {
      allowedUpdates.location = req.body.location.trim();
    }
    if (req.body.jobLink !== undefined) {
      allowedUpdates.jobLink = req.body.jobLink.trim();
    }
    if (req.body.notes !== undefined) {
      allowedUpdates.notes = req.body.notes.trim();
    }
    if (req.body.appliedDate !== undefined) {
      allowedUpdates.appliedDate = req.body.appliedDate;
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      allowedUpdates,
      { new: true, runValidators: true },
    );

    res.status(200).json(updatedApplication);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update application", error: error.message });
  }
});

// DELETE /api/applications/:id — Nijer application delete kora
router.delete("/:id", async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this application" });
    }

    await application.deleteOne();
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to delete application", error: error.message });
  }
});

module.exports = router;
