import { Observable } from 'rxjs';
import { Article, ArticleWithTopicTitle } from '../../models/article.model';

export abstract class ArticleGateway {
  abstract getArticles$(): Observable<Article[]>;
  abstract getArticleById$(
    articleId: number
  ): Observable<ArticleWithTopicTitle>;
}
