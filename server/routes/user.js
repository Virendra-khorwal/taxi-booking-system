const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const bookingController = require('../controllers/bookingController');

router.get('/', homeController.view);
router.post('/', homeController.view);
router.get('/admin', adminController.form);
router.post('/admin', adminController.check);
router.get('/booking', bookingController.form);
router.post('/booking', bookingController.check);
router.post('/bookingForm', bookingController.create);
// router.get('/admin', userController.view);
// router.post('/admin', userController.find);
router.get('/admin/addDriver', userController.form);
router.post('/admin/addDriver', userController.create);
router.get('/admin/customer', adminController.viewCus);
router.get('/admin/driver', adminController.viewDriv);
router.get('/admin/feedback', adminController.viewFdk);
router.get('/admin/driverupdate/:id', userController.driveredit);
router.post('/admin/driverupdate/:id', userController.driverupd);

 

module.exports = router;
 