import { Observable } from 'rxjs';
import {
  Article,
  ArticleComment,
  ArticleWithTopicTitle,
  CreateArticleDto,
  CreateCommentDto,
} from '../../models/article.model';

export abstract class ArticleGateway {
  abstract getArticles$(ascending?: boolean): Observable<Article[]>;
  abstract getArticleById$(
    articleId: number
  ): Observable<ArticleWithTopicTitle>;
  abstract createArticle$(
    createArticleDto: CreateArticleDto
  ): Observable<Article>;

  abstract getCommentsByArticleId$(
    articleId: number
  ): Observable<ArticleComment[]>;

  abstract createComment$(
    createCommentDto: CreateCommentDto,
    articleId: number
  ): Observable<ArticleComment>;
}
