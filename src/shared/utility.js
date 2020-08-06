export const updateObject = (oldObject, updatedProperties) => {
  return {
      ...oldObject,
      ...updatedProperties
  };
};

export const getTotalColSpan = (columns) => {
  return columns.reduce((acc, cur) => acc + 1, 0)
}