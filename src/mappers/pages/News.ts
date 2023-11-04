import { Stack } from "../../utils";

const getNewsPageData = async () => {
  const newsPageData: any = {};

  try {
    const newsListKey = "news_list";
    const NewsQuery = Stack.ContentType("pages").Query();
    const newsData = await NewsQuery.where("title", "News").toJSON().findOne();
    newsPageData.pageContent = newsData.page_content;
    newsPageData.seoData = newsData.seo_data;

    const newsListQuery = Stack.ContentType("articles").Query();
    const newsListData = await newsListQuery.toJSON().find();

    const newsListBlock = newsPageData.pageContent.find((item) => {
      return Object.keys(item)[0] === newsListKey;
    });

    const newsListIndex = newsPageData.pageContent.findIndex(
      (item: Object) => item === newsListBlock,
    );

    newsPageData.pageContent[newsListIndex][newsListKey].newsItems =
      newsListData[0];
  } catch (err) {
    console.log(err);
  }
  return newsPageData;
};

export default getNewsPageData;
