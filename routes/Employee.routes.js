const express = require('express');
const router = express.Router();

const EmployeeController = require('../controllers/Employee.controllers');
const Authenticate = require('../middlewares/Auth.middlewares');
const Authorize = require('../middlewares/Role.middlewares');

router.get('/GetAllEmployee',
    Authenticate.protect,
    Authorize.authorize("MANAGER","TL"),
    EmployeeController.GetAllEmployee);


router.get('/GetEmployeeByID',
    Authenticate.protect,
    Authorize.authorize("MANAGER","TL"),
    EmployeeController.GetEmployeeByID);


router.post('/CreateEmployee',
    Authenticate.protect,
    Authorize.authorize("MANAGER"),
    EmployeeController.CreateEmployee);


router.delete('/DeleteEmployee',
    Authenticate.protect,
    Authorize.authorize("MANAGER"),
    EmployeeController.DeleteEmployeeByID);


router.put('/UpdateEmployee',
    Authenticate.protect,
    Authorize.authorize("MANGER","TL"),
    EmployeeController.UpdateEmployeeByID);

module.exports=router;
