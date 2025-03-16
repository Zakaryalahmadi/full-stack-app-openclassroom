export type Article = {
  id: number;
  title: string;
  author: string;
  theme: string;
  content: string;
  dateCreated: string;
};

export type ArticleWithTopicTitle = Article & {
  topicTitle: string;
};
