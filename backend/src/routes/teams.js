const express = require("express");
const router = express.Router();
const passport = require("passport"); // if using passport for auth
const { createTeam, getTeamById, getAllTeams, requestToJoinTeam, acceptRequest, rejectRequest } = require("../controllers/teamController");

// Protected route: only logged-in users can create team
router.post("/:id/create-team", passport.authenticate("session", { session: true }), createTeam);

router.get('/:id', getTeamById);

router.get('/', getAllTeams);

router.post('/:id/request', requestToJoinTeam);

router.post('/:id/acceptReq/:memberId', acceptRequest);

router.post('/:id/rejectReq/:memberId', rejectRequest);

module.exports = router;
