const express = require('express');
const router = express.Router();

const TlController = require('../controllers/Tl.controllers');
const Authenticate = require('../middlewares/Auth.middlewares');
const Authorize = require('../middlewares/Role.middlewares');

router.get('/GetAllTl',
    Authenticate.protect,
    Authorize.authorize("MANAGER"),
    TlController.GetAllTL);

router.get('/GetTlByMangerID',
    Authenticate.protect,
    Authorize.authorize("MANAGER"),
    TlController.GetTLbyID
)

router.put('/UpdateTlBYManagerID',
    Authenticate.protect,
    Authorize.authorize("MANAGER"),
    TlController.UpdateTlBYManagerID
)

router.delete('/DeleteTlBYManagerID',
    Authenticate.protect,
    Authorize.authorize("MANAGER"),
    TlController.DeleteTlByManagerID
)


module.exports = router;