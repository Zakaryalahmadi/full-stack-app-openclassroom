import { Observable, of, throwError } from 'rxjs';
import { Article } from '../../models/article.model';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleGateway } from '../../ports/article/article.gateway';

export class ArticleApiGateway implements ArticleGateway {
  private readonly http = inject(HttpClient);

  private readonly mockArticles: Article[] = [
    {
      id: 1,
      title: 'Getting Started with Angular',
      author: 'John Doe',
      content:
        'Angular is a powerful framework for building web applications. In this article, we will explore the basics of Angular and how to get started with your first project.',
      date: '2024-01-15',
      theme: 'Angular',
    },
    {
      id: 2,
      title: 'Understanding RxJS Observables',
      author: 'Jane Smith',
      content:
        'RxJS is a library for reactive programming using Observables. Learn how to handle asynchronous data streams effectively in your Angular applications.',
      date: '2024-01-20',
      theme: 'RxJS',
    },
    {
      id: 3,
      title: 'Angular Best Practices',
      author: 'Mike Johnson',
      content:
        'Discover the best practices and patterns for developing scalable and maintainable Angular applications. Topics include component design, state management, and performance optimization.',
      date: '2024-01-25',
      theme: 'Angular',
    },
    {
      id: 4,
      title: 'RxJS Observables in Angular',
      author: 'Sarah Lee',
      content:
        'RxJS Observables are a powerful tool for handling asynchronous data streams in Angular applications. This article will cover the basics of RxJS Observables and how to use them effectively in your projects.',
      date: '2024-01-30',
      theme: 'RxJS',
    },
  ];

  getArticles$(): Observable<Article[]> {
    return of(this.mockArticles);
  }

  getArticleById$(articleId: number): Observable<Article> {
    const article = this.mockArticles.find(
      (article) => article.id === articleId
    );

    if (!article) return throwError(() => new Error('Article not found'));

    return of(article);
  }
}
