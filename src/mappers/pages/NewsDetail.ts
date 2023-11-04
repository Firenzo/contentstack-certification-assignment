import { Stack } from "../../utils";

const getNewsArticle = async (articleURL) => {
  const articleData: any = {};

  try {
    const Query = Stack.ContentType("articles").Query();
    const fetchedArticle = await Query.toJSON()
      .where("url", articleURL)
      .findOne();
    articleData.title = fetchedArticle.title;
    articleData.image = fetchedArticle.image;
    articleData.introduction = fetchedArticle.introduction;
    articleData.content = fetchedArticle.content;
    articleData.seoData = fetchedArticle.seo_data ?? undefined;
  } catch (error) {
    console.log(error);
  }

  return articleData;
};

export default getNewsArticle;
