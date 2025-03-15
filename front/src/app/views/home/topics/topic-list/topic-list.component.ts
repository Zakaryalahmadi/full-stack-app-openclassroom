import {
  Component,
  ContentChild,
  Directive,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { Topic } from 'src/app/core/models/topic.model';
import TopicCardComponent from '../topic-card/topic-card.component';
import { NgFor, NgTemplateOutlet } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Directive({
  selector: 'ng-template [topicActionButton]',
})
export class TopicActionButtonDirective {}

@Component({
  selector: 'app-topic-list',
  template: `
    <div class="p-8 flex flex-col sm:grid grid-cols-2 gap-5">
      @for (topic of topics(); track topic.id) {
      <app-topic-card [topic]="topic">
        <ng-container
          slot="action-button"
          *ngTemplateOutlet="actionButtonTemplate"
        ></ng-container>
      </app-topic-card>
      }
    </div>
  `,
  imports: [TopicCardComponent, MatButtonModule, NgTemplateOutlet],
})
export class TopicListComponent {
  @ContentChild(TopicActionButtonDirective, { read: TemplateRef })
  actionButtonTemplate!: TemplateRef<unknown>;

  readonly topics = input.required<Topic[]>();
}
