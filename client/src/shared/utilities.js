import format from 'date-fns/format';

export const ucFirst = (word) => word.charAt(0).toUpperCase() + word.substring(1);

export function arraySortByDateDesc(a, b) {
  if (a.date < b.date) {
    return 1;
  }
  if (a.date > b.date) {
    return -1;
  }
  return 0;
}

export const whiteSpacesValidator = (value) => !!/\s/.test(value);

export const formatDateToYear = date => parseInt(format(date, 'yyyy'), 10);

export const formatCurrency = (amount, currency, locale) => (
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount)
);

export const errorMessageHandler = error => (error.response ? error.response.data.message : 'Something went wrong!');
