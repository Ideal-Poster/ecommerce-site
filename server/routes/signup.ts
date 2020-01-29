import express from 'express';
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

router.post('/', validationRules, (req: any, res: any, next: any) => {
    console.log(req.body);
    console.log((validationResult(req).array()));
});

export default router;