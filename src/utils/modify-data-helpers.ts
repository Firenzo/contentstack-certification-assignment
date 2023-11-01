export const getFieldsWithArrayValue = (object: Object) => {
  return Object.entries(object).filter(([key, value]) => {
    return Array.isArray(value);
  });
};

export const getReferenceFields = (fieldsWithArrayValue) => {
  return fieldsWithArrayValue.filter((item) => {
    const match = item[1].filter((checkItem) => {
      return "uid" in checkItem && "_content_type_uid" in checkItem;
    });
    return match.length >= 1;
  });
};

export const hasReferenceFields = (fieldsWithArrayValue) => {
  return fieldsWithArrayValue.some((item) => {
    const isMatch = item[1].some((obj) => {
      return "uid" in obj && "_content_type_uid" in obj;
    });
    return isMatch;
  });
};
