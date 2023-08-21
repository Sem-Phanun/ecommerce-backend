const isEmptyOrNull = (value) => {
  if (value == "" || value == null || value == undefined) {
    return true;
  }
};

module.exports = isEmptyOrNull;
