import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-topic-card',
  imports: [],
  template: `<p>topic-card works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TopicCardComponent {}
