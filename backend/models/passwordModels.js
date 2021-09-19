const passwordValidator = require('password-validator');
const schemaPassword = new passwordValidator();

schemaPassword
    .is().min(8)                                    // Minimum length 8
    .is().max(32)                                  // Maximum length 32
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 1 digit
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123', '123azertY']); // Blacklist these values

module.exports = schemaPassword;