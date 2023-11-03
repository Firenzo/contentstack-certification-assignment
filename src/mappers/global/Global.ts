import { Stack } from "../../utils";

const getGlobalData = async () => {
  const globalData: any = {};

  try {
    const Query = Stack.ContentType("site_info").Query();
    const siteInfo = await Query.toJSON().findOne();
    globalData.siteTitle = siteInfo.title;
    globalData.tagline = siteInfo.tagline;
    globalData.footerText = siteInfo.footer_text.replaceAll(
      "{currentYear}",
      new Date().getFullYear(),
    );
  } catch (error) {
    console.log(error);
  }

  return globalData;
};

export default getGlobalData;
