import moment from 'moment'

export const getRegexEmail = () => {
  const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  return re
}

export const getRegexDOB = (dateString) => {
  return moment(dateString, 'DD/MM/YYYY', true).isValid()
}
