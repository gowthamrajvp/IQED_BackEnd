const { createIQSession,getIQSession,updateIQSessionAnswers, SendMail} = require("../controllers/IQSession.controller");
const { deleteQuestions,getAllQuestions,getQuestions,postQuestions,putQuestions,postBulkQuestions} = require("../controllers/IQQuestion.controller");
const {updateIQ,IQUserVerify,Createbulkusers} = require("../controllers/IQUser.controller")
const router = require("express").Router();


// POST
router.post("/createSession",createIQSession)
router.post("/getSession",getIQSession)
router.put("/updateAnswers",updateIQSessionAnswers)
router.post("/SendEmail",SendMail)

router.post("/bulk-users",Createbulkusers)
router.post("/IQUsersVerify",IQUserVerify)
router.post("/update-iq",updateIQ)



router.get("/question:id", getQuestions);
router.get("/question", deleteQuestions);
// router.post("/question", postQuestions);

router.post("/question", postBulkQuestions);    
router.put("/question:id", putQuestions);
router.delete("/question:id", deleteQuestions);

module.exports = router;