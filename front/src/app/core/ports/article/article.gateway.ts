import { Observable } from 'rxjs';
import {
  Article,
  ArticleWithTopicTitle,
  CreateArticleDto,
} from '../../models/article.model';

export abstract class ArticleGateway {
  abstract getArticles$(ascending?: boolean): Observable<Article[]>;
  abstract getArticleById$(
    articleId: number
  ): Observable<ArticleWithTopicTitle>;
  abstract createArticle$(
    createArticleDto: CreateArticleDto
  ): Observable<Article>;
}
