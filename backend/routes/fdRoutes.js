const express = require("express");
const router = express.Router();

const {
  createFD,
  getAllFDs,
  deleteFD
} = require("../controllers/fdController");

// Create New FD
router.post("/", createFD);

// Get All FDs
router.get("/", getAllFDs);

// Delete FD by ID
router.delete("/:id", deleteFD);

module.exports = router;