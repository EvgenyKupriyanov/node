function genPassword(count) {
  try {
    if (typeof count === 'number' && count > 0 && Number.isInteger(count)){
      let password = '';
      const symbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*()-_=+[{]}\\|;:"\',./<>?';
      for (let i = 0; i < count; i++) {
        password += symbols[Math.floor(Math.random() * symbols.length)] ;
      }
      return password;
    } else {
      throw new Error('Wrong parametr');
    }
  } catch (error) {
    console.error(error.message);
  }
}


module.exports = { genPassword }