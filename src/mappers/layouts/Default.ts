import getGlobalData from "../global/Global";

const getDefaultLayoutData = async () => {
  const globalData = await getGlobalData();
  const defaultLayoutData: any = {};
  defaultLayoutData.siteTitle = globalData.siteTitle;
  defaultLayoutData.tagline = globalData.tagline;
  defaultLayoutData.footerText = globalData.footerText;
  return defaultLayoutData;
};

export default getDefaultLayoutData;
