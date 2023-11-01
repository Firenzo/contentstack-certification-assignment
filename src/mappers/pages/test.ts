const createChangeObject = () => {
  const returnArr: any = [];
  // Some other code...

  contentBlocksWithReferences.forEach(async (contentBlockWithReference) => {
    const dataToChangeArray = [];
    await Promise.all(
      referenceFields.map(async (referenceField) => {
        const newData = await Promise.all(
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
          newData: newData,
        };

        dataToChangeArray.push(dataToChangeObject);
      }),
    );

    const returnObj = {
      index: itemIndex,
      key: key,
      referenceFieldKeys: dataToChangeArray,
    };
    returnArr.push(returnObj);
  });

  return returnArr;
};

// get index
const itemIndex = homePageData.pageContent.findIndex(
  (item: Object) => item === contentBlockWithReference,
);

// get key
const key = Object.keys(contentBlockWithReference)[0];

// get reference fields
const fieldsWithArrayValue = Object.entries(
  contentBlockWithReference[key],
).filter(([key, value]) => {
  return Array.isArray(value);
});

const referenceFields = fieldsWithArrayValue.filter((item) => {
  const match = item[1].filter((checkItem) => {
    return "uid" in checkItem && "_content_type_uid" in checkItem;
  });

  return match.length >= 1;
});
