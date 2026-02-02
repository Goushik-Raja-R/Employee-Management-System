const express = require('express');
const router = express.Router();

const TlController = require('../controllers/Tl.controllers');
const Authenticate = require('../middlewares/Auth.middlewares');
const Authorize = require('../middlewares/Role.middlewares');

console.log("Hello");


router.get('/GetAllTl',
    Authenticate.protect,
    Authorize.authorize("MANAGER"),
    TlController.GetAllTL);


module.exports = router;