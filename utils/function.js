const generateRandomFiveDigitNumberAsString = () => {
  const randomNumber = Math.floor(Math.random() * 90000) + 10000;

  const randomString = randomNumber.toString();


  return randomString
};

const generateRandomPassword = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export { generateRandomFiveDigitNumberAsString, generateRandomPassword }