import { Observable } from 'rxjs';
import { Topic } from '../../models/topic.model';

export abstract class TopicGateway {
  abstract getTopics$(): Observable<Topic[]>;
  abstract followTopic$(topicId: string): Observable<void>;
  abstract unfollowTopic$(topicId: string): Observable<void>;
}
