import { Stack } from "../../utils";
import globalData from "../global/Global";
import { getFieldsWithArrayValue, hasReferenceFields } from "../../utils";
import { debugLog } from "../../utils/dev-helpers";
import { createReplaceObjects } from "../../utils/modify-data";

const homePageData: any = {};
homePageData.siteTitle = globalData.siteTitle;

try {
  const PagesQuery = Stack.ContentType("pages").Query();
  const homeData = await PagesQuery.where("title", "Home").toJSON().find();
  homePageData.pageContent = homeData[0][0].page_content;

  const contentBlocksWithReferences = homePageData.pageContent.filter(
    (_contentBlock, index) => {
      return index === 1 || index === 2;
    },
  );

  const getContentBlocksWithReferences = (content) => {
    return content.filter((contentBlock) => {
      // get content block key
      const key = Object.keys(contentBlock)[0];
      const fieldsWithArrayValue = getFieldsWithArrayValue(contentBlock[key]);
      const test = hasReferenceFields(fieldsWithArrayValue);
      return test;
    });
  };

  debugLog(getContentBlocksWithReferences(homePageData.pageContent));

  const objectsToBeReplaced = await createReplaceObjects(
    homePageData.pageContent,
    contentBlocksWithReferences,
  );

  objectsToBeReplaced.forEach((replaceObj) => {
    replaceObj.refFieldKeyValue.forEach((replaceData) => {
      homePageData.pageContent[replaceObj.index][replaceObj.key][
        replaceData.key
      ] = replaceData.newData;
    });
  });
} catch (error) {
  console.log(error);
}

export default homePageData;
