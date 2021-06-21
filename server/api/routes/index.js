const router = require("express").Router();
module.exports = router;

router.use("/cmos", require("./cmos"));
router.use("/pools", require("./pools"));

router.use((req, res, next) => {
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
});
