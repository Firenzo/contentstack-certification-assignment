import { Stack } from "./index";
import { getFieldsWithArrayValue } from "./index";

export const toPokemonNumber = (number: number) => {
  const numberLength = number.toString().length;
  if (numberLength === 1) {
    return `#00${number}`;
  }

  if (numberLength === 2) {
    return `#0${number}`;
  }

  if (numberLength > 2) {
    return `#${number}`;
  }
};

export const createReplaceObjects = async (
  content,
  contentBlocksWithReferences,
) => {
  const returnArr = [];

  for (const contentBlockWithReference of contentBlocksWithReferences) {
    // get index
    const itemIndex = content.findIndex(
      (item: Object) => item === contentBlockWithReference,
    );

    // get key
    const key = Object.keys(contentBlockWithReference)[0];

    // get fields with array as value
    const fieldsWithArrayValue = getFieldsWithArrayValue(
      contentBlockWithReference[key],
    );

    // get reference fields
    const referenceFields = fieldsWithArrayValue.filter((item) => {
      const match = item[1].filter((checkItem) => {
        return "uid" in checkItem && "_content_type_uid" in checkItem;
      });
      return match.length >= 1;
    });

    // Get data from reference
    const dataToChangeArray = [];
    for (const referenceField of referenceFields) {
      const newDataArray = await Promise.all(
        referenceField[1].map(async (references) => {
          const Query = Stack.ContentType(references._content_type_uid).Entry(
            references.uid,
          );
          const data = await Query.fetch();
          return data;
        }),
      );

      const dataToChangeObject = {
        key: referenceField[0],
        newData: newDataArray,
      };

      dataToChangeArray.push(dataToChangeObject);
    }

    const returnObj = {
      index: itemIndex,
      key: key,
      refFieldKeyValue: dataToChangeArray,
    };
    returnArr.push(returnObj);
  }

  return returnArr;
};
