const express = require('express');
const router = express.Router();
const passport = require('passport');
const controllers = require('.././controllers');
const AuthMiddleware = require('.././middleware/auth')
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();


router.get('/', controllers.homeController.index);

//Rutas de usuario

router.get('/user/signup', controllers.UserControllers.getSignUp);
router.post('/user/signup', controllers.UserControllers.postSignUp);
router.get('/user/signin', controllers.UserControllers.getSignIn);
router.post('/user/signin', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/user/signin',
    failureFlas: true
}));
router.get('/user/logout', controllers.UserControllers.logOut);
router.get('/user/panel',AuthMiddleware.isLoggedUser ,controllers.UserControllers.getUserPanel);
router.get('/admin/panel',AuthMiddleware.isLoggedUser ,controllers.AdminControllers.getUserPanel);
router.post('/user/panel',AuthMiddleware.isLoggedUser, multipartMiddleware ,controllers.UserControllers.upLoad);
router.post('/admin/panel',AuthMiddleware.isLoggedUser,controllers.AdminControllers.postCobro);

module.exports = router;