const express = require('express');
const router = express.Router();
const myRepository = require('./myRepository');
const app = express();

router.get("/category/:cat_name", async (req, res) => {
    try {
        const x = await myRepository.getAllRestaurants(req.params.cat_name);
        res.send(x);
    } catch (e) {
        console.log(e);
    }
});

router.post("/login", myRepository.signIn);

router.post("/addnewbusiness", async (req, res) => {
    try {
        const x = await myRepository.AddNewBusiness(req.body);
        res.send(x);
    } catch (e) {
        console.log(e);

    }
});

// -------------------------
// users:

router.post("/addnewuser", async (req, res) => {
    try {
        const x = await myRepository.AddNewUser(req.body);
        res.send(x);
    } catch (e) {
        console.log(e);

    }
});

// -------------------
// tablereservation:
router.post("/tablereservation/:username", async (req, res) => {
    try {
        const x = await myRepository.AddNewTablereservation(req.body);
        res.send(x);
    } catch (e) {
        console.log(e);

    }
});

// ----------------
// commentsandrating:
router.post("/newComment", async (req, res) => {
    console.log(req.body);
    try {
        console.log(req.body, "$$$$$$$$$$");
        const x = await myRepository.AddCommentToCard(req.body)
        console.log(x, "the comment has been sent...");
        res.send(x);
    } catch (e) {
        console.log(e);

    }


})

router.get("/comment/:businessName", async (req, res) => {
    // console.log("from line 70" , req);
    try {
        const x = await myRepository.GetCommentsByBusinessId(req.params.businessName);
        // console.log(req.body);
        res.send(x);
    } catch (e) {
        console.log(e);
    }
});



module.exports = router;