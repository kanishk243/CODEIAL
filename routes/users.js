const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users_controller");
const passport = require("passport");

router.get(
  "/profile/:id",
  passport.checkAuthentication,
  usersController.profile
);
router.get("/sign-up", usersController.signUp);
router.get("/sign-in", usersController.signIn);
router.get("/reset-password", usersController.resetPassword);
router.get("/reset-page/:token", usersController.resetPage);
router.get('/update-page/:id',usersController.updatePage);
router.post("/create", usersController.create);
router.post("/send-reset-link", usersController.sendResetLink);
router.post("/change-password/:token", usersController.changePassword);
router.post(
  "/update/:id",
  passport.checkAuthentication,
  usersController.update
);

//use passport as a middle ware
router.post(
  "/create-session",
  passport.authenticate("local", {
    failureRedirect: "/users/sign-in",
  }),
  usersController.createSession
);
router.get("/sign-out", usersController.signOut);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);
module.exports = router;
