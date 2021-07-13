const db = require("./db");
const CMOBody = require("./models/cmos/CMOBody");
const CMOHeader = require("./models/cmos/CMOHeader");
const OFinCMO = require("./models/cmos/OFinCMO");
const CPN = require("./models/CPN");
const Pool = require("./models/pools/Pool");
const PoolBody = require("./models/pools/PoolBody");
const PoolPrediction = require("./models/pools/PoolPrediction");
const PoolFHAVA = require("./models/pools/PoolFHAVA");
const Platinum = require("./models/platinums/Platinum");
const PlatinumBody = require("./models/platinums/PlatinumBody");
const Collateral = require("./models/platinums/Collateral");


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
		Platinum,
		PlatinumBody,
		Collateral,
		OFinCMO
	},
};