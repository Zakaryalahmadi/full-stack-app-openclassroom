export type Article = {
  id: number;
  title: string;
  author: string;
  relatedTopicId: number;
  theme: string;
  content: string;
  dateCreated: string;
};

export type ArticleWithTopicTitle = Article & {
  topicTitle: string;
};

export type CreateArticleDto = {
  topicId: string;
  title: string;
  content: string;
};
