var passwordValidator = require('password-validator');

module.exports = (req, res, next) => {
    try {
        var schema = new passwordValidator();

        schema
        .is().min(8)                                    // Minimum length 8
        .is().max(100)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits(2)                                // Must have at least 2 digits
        .has().not().spaces()                           // Should not have spaces
        .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

        result = schema.validate(req.body.password)
        console.log(result);
      if (result == false) {
        throw 'Le mot de passe ne correspond pas aux criteres';
      } else {
        next();
      }
    } catch {
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
  };