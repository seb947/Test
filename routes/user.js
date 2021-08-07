const express = require('express');
const router = express.Router();
//var CryptoJS = require("crypto-js");
const pwdValidator = require('../middleware/password-validator');
// Encrypt
//var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();

// Decrypt
//var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
//var originalText = bytes.toString(CryptoJS.enc.Utf8);
const userCtrl = require('../controllers/user');

router.post('/signup', pwdValidator, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;