import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Topic } from '../../models/topic.model';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TopicGateway } from '../../ports/topic/topic.gateway';
import { environment } from 'src/environments/environment';

export class TopicApiGateway implements TopicGateway {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = environment.backendBaseUrl;

  getTopics$(): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${this.baseUrl}/topic`);
  }

  followTopic$(topicId: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/topic/${topicId}/follow`, {});
  }

  unfollowTopic$(topicId: number): Observable<void> {
    return this.http.patch<void>(
      `${this.baseUrl}/topic/${topicId}/unfollow`,
      {}
    );
  }
}
