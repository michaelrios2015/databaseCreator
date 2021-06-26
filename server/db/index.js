const db = require("./db");
const CMOBody = require("./models/CMOBody");
const CMOHeader = require("./models/CMOHeader");
const CPN = require("./models/CPN");
const Pool = require("./models/Pool");
const PoolBody = require("./models/PoolBody");
const PoolPrediction = require("./models/PoolPrediction");
const PoolFHAVA = require("./models/PoolFHAVA");
const Platinum = require("./models/Platinum");


CMOHeader.hasMany(CMOBody);
CMOBody.belongsTo(CMOHeader);


// Pool.hasMany(PoolBody);
// PoolBody.belongsTo(Pool);

// PoolBody.hasOne(PoolPrediction);
// PoolPrediction.belongsTo(PoolBody);


module.exports = {
	db,
	models: {
		CMOBody,
		CMOHeader,
		CPN,
		Pool,
		PoolBody,
		PoolPrediction,
		PoolFHAVA,
		Platinum
	},
};