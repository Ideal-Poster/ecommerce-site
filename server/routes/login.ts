const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const validationRules = [
	check('password').isLength({ min: 6 }),
	check('email').isEmail()
];

router.post('/', validationRules, (req: any, res: any, next: any) => {
	console.log(req.body);
	console.log((validationResult(req).array()));
 });