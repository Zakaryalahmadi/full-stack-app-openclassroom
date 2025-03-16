import { Topic } from 'src/app/core/models/topic.model';
import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TopicGateway } from 'src/app/core/ports/topic/topic.gateway';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-topic-subscription-button',
  imports: [MatButtonModule],
  template: ` @if(!isSubscribed()) {
    <button mat-raised-button (click)="followTrigger.emit()" color="primary">
      s'abonner
    </button>
    } @if(isSubscribed()){
    <span
      class="bg-[#939393] m-0 h-10 font-bold px-3 rounded-md  flex justify-center items-center text-white"
    >
      Déja abonné
    </span>

    }`,
})
export default class TopicSubscriptionButtonComponent {
  readonly topic = input.required<Topic>();
  readonly followTrigger = output<void>();

  readonly currentUserId = input.required<number | undefined>();

  readonly isSubscribed = computed(() => {
    console.log(this.topic());
    if (!this.currentUserId()) throw Error('pas de current userId');

    return this.topic().subscriberIds.includes(this.currentUserId()!);
  });
}
