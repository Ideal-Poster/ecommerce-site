import express from 'express';
var jwt = require('jsonwebtoken');

const { check , validationResult } = require("express-validator");
const router = express.Router();

// router.get('/', (req, res, next) => {
//     return res.render('signup', { title: 'Picogram' });
// });

const validationRules = [
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
    check('username').isAlphanumeric()
]; 

router.post('/', validationRules, async (req: any, res: any, next: any) => {
    // console.log(req.body);
    // console.log((validationResult(req).array()));

    const authorization = await jwt.sign(
			{ email: req.body.email, password:req.body.password },
			'secretKey'
			// ,
			// {
			// 	algorithm: "HS256",
			// 	expiresIn: "15m"
			// }
		);
		// console.log(`token ${token}`);
		
		res.json({accessToken: authorization})
});

export default router;