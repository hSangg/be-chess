export const generateRandomFiveDigitNumberAsString = () => {
  const randomNumber = Math.floor(Math.random() * 90000) + 10000;

  const randomString = randomNumber.toString();

  return randomString;
};
