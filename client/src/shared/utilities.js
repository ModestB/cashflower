export const ucFirst = (word) => word.charAt(0).toUpperCase() + word.substring(1);

export function arraySortByDate(a, b) {
  if (a.date < b.date) {
    return 1;
  }
  if (a.date > b.date) {
    return -1;
  }
  return 0;
}
