import { Stack } from "../../utils";

const globalData: any = {};

try {
  const Query = Stack.ContentType("site_info").Query();
  const siteInfo = await Query.toJSON().find();
  globalData.siteTitle = siteInfo[0][0].title;
  globalData.tagline = siteInfo[0][0].tagline;
  globalData.footerText = siteInfo[0][0].footer_text.replaceAll(
    "{currentYear}",
    new Date().getFullYear(),
  );
} catch (error) {
  console.log(error);
}

export default globalData;
