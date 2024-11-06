// check valid date
export function checkDate(date) {
  var format = /^(19[7-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  try {
    if (!format.test(date)) return false;
    return true;
  } catch (err) {
    return false;
  }
}
