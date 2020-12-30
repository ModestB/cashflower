const errorFormatter = (error = {}, customMessage = '') => {
  let message = 'Something went Wrong!';
  if (customMessage.length) {
    message = customMessage;
  } else if (error._message) {
    message = error._message;
  }
  const formatedError = {
    message,
    errors: {},
  };
  let errors = {};
  if (error.message) {
    errors = error.message
      .substring(error.message.indexOf(':') + 1)
      .trim()
      .split(',')
      .map((error) => error.trim());
    errors.forEach((error) => {
      const [key, value] = error.split(':').map((err) => err.trim());
      formatedError.errors[key] = value;
    });
  }

  return formatedError;
};

module.exports = {
  errorFormatter,
};
