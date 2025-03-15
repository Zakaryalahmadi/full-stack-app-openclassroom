import { Observable } from 'rxjs';
import { Topic } from '../../models/topic.model';

export abstract class TopicGateway {
  abstract getTopics$(): Observable<Topic[]>;

  abstract getCurrentTopics$(): Observable<Topic[]>;
}
