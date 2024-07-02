const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = async(password,hashPassword) => {
    return bcrypt.compare(password,hashPassword)
}

module.exports = {hashPassword,comparePassword}