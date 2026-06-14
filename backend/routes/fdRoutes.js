const express = require('express');
require('express');
const router = express.Router();

const {
  createFD,
  getAllFDs,
  deleteFD
} = require('../controllers/fdController');
router.delete("/:id", async (req, res) => {
    try {
      await db.query(
        "DELETE FROM fixed_deposits WHERE id = ?",
        [req.params.id]
      );
  
      res.json({ message: "FD Deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
  });
router.post('/', createFD);
router.get('/', getAllFDs);
router.delete("/:id", deleteFD);
module.exports = router;