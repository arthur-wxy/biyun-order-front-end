const logger = (module, action, message, data = null) => {
  const log = `[${module}] ${action}: ${message}`;
  if (data) {
    console.log(log, data);
  } else {
    console.log(log);
  }
};

export default logger; 