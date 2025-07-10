export const isValidString = (value, minLength = 2) => {
  return typeof value === 'string' && value.trim().length >= minLength;
};

export const isValidEmail = (email) => {
  const regex = /^\S+@\S+\.\S+$/;
  return typeof email === 'string' && regex.test(email);
};
