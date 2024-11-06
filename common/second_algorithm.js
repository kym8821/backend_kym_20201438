function checkEmpty(value) {
  let res = true;
  if (Array.isArray(value)) {
    value.forEach((v) => {
      if (!checkEmpty(v)) res = false;
    });
  } else if (value === undefined || value === null || value === "") {
    res = true;
  } else if (typeof value === "object") {
    Object.values(value).forEach((v) => {
      if (!checkEmpty(v)) res = false;
    });
  } else {
    return (res = false);
  }
  return res;
}

function isEmpty(value) {
  ret = checkEmpty(value);
  return ret;
}
