import moment from 'moment'

export const getRegexEmail = () => {
  const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  return re
}

export const getRegexPassowrd = () => {
  const re = /^[A-Z][a-zA-Z0-9]{5,}$/
  return re
}

export const getRegexDOB = (dateString) => {
  return moment(dateString, 'DD/MM/YYYY', true).isValid()
}

export const formatNumberToK = (number) => {
  if (number >= 1000) {
    return (number / 1000).toFixed(3).replace(/\.0+$/, '') + 'k';
  } else {
    return number.toString();
  }
}

export const formatNumber = (number) => {
  var formattedNumber = number.toLocaleString('en-US').replace(/,/g, '.')
  return formattedNumber
}
