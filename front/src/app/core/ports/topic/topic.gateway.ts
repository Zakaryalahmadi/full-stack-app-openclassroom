import { Observable } from 'rxjs';
import { Topic } from '../../models/topic.model';

export abstract class TopicGateway {
  abstract getTopics$(): Observable<Topic[]>;
  abstract followTopic$(topicId: number): Observable<void>;
  abstract unfollowTopic$(topicId: number): Observable<void>;
}
