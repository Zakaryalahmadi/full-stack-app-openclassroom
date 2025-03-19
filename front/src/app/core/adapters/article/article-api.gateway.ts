import { Observable, of, throwError } from 'rxjs';
import {
  Article,
  ArticleWithTopicTitle,
  CreateArticleDto,
} from '../../models/article.model';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleGateway } from '../../ports/article/article.gateway';
import { environment } from 'src/environments/environment';

export class ArticleApiGateway implements ArticleGateway {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = `${environment.backendBaseUrl}/articles`;

  getArticles$(ascending: boolean = false): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}?ascending=${ascending}`);
  }

  getArticleById$(articleId: number): Observable<ArticleWithTopicTitle> {
    return this.http.get<ArticleWithTopicTitle>(`${this.baseUrl}/${articleId}`);
  }

  createArticle$(createArticleDto: CreateArticleDto): Observable<Article> {
    return this.http.post<Article>(`${this.baseUrl}`, createArticleDto);
  }
}
