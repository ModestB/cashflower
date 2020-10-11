export const updateObject = (oldObject, updatedProperties) => {
  return {
      ...oldObject,
      ...updatedProperties
  };
};

export const ucFirst = (word) => word.charAt(0).toUpperCase() + word.substring(1);