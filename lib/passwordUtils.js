const crypto = require("crypto")

const generatePasswordHash = (password) =>
{
    const salt = crypto.randomBytes(32).toString("hex")
    const generatedHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex")
    return {
        salt:salt,
        hash:generatedHash
    }
}

const validatePassword = (password, hash, salt) =>
{
    const newHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex")
    return newHash === hash
}

module.exports.validatePassword = validatePassword
module.exports.generatePasswordHash = generatePasswordHash