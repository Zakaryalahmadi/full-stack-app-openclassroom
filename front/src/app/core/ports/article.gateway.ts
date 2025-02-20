import { Observable } from 'rxjs';
import { Article } from '../models/article.model';

export abstract class ArticleGateway {
  abstract getArticles$(): Observable<Article[]>;
}
