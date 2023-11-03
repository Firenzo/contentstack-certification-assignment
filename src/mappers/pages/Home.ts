import { Stack } from "../../utils";
import getGlobalData from "../global/Global";
import { getContentBlocksWithReferences } from "../../utils";
import { debugLog } from "../../utils/dev-helpers";
import { createReplaceObjects } from "../../utils/modify-data";

const getHomePageData = async () => {
  const globalData = await getGlobalData();
  const homePageData: any = {};
  homePageData.siteTitle = globalData.siteTitle;

  // fetch page content
  try {
    const PagesQuery = Stack.ContentType("pages").Query();
    const homeData = await PagesQuery.where("title", "Home").toJSON().findOne();
    homePageData.pageContent = homeData.page_content;

    const contentBlocksWithReferences = getContentBlocksWithReferences(
      homePageData.pageContent,
    );

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

  return homePageData;
};

export default getHomePageData;
