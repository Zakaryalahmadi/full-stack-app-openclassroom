import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Topic } from 'src/app/core/models/topic.model';
@Component({
  selector: 'app-topic-card',
  imports: [MatButtonModule],
  template: `
    <div class="bg-card-primary p-4 rounded-lg">
      <h2>{{ topic().title }}</h2>
      <p>
        {{ topic().description }}
      </p>
      <div class="flex justify-center">
        <ng-content select="[slot='action-button']" />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TopicCardComponent {
  readonly topic = input.required<Topic>();
}
