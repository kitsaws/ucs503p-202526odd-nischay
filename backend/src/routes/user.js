const express = require("express");
const { getUserById, updateProfile } = require("../controllers/userController");

const router = express.Router();

router.get('/:id', getUserById);

router.put('/:id/update', updateProfile);

module.exports = router;
