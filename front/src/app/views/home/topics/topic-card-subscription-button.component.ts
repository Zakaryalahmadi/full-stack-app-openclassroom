import { Topic } from 'src/app/core/models/topic.model';
import { Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-topic-subscription-button',
  imports: [MatButtonModule],
  template: ` @if(isSubscribed()) {
    <button mat-raised-button color="primary">s'abonner</button>
    } @if(!isSubscribed()){
    <span
      class="bg-[#939393] m-0 h-10 font-bold px-3 rounded-md  flex justify-center items-center text-white"
    >
      Déja abonné
    </span>

    }`,
})
export default class TopicSubscriptionButtonComponent {
  readonly topic = input.required<Topic>();
  readonly currentUserId = input.required<number | undefined>();

  readonly isSubscribed = computed(() => {
    if (!this.currentUserId()) throw Error('pas de current userId');

    console.log(this.topic().subscriberIds.includes(this.currentUserId()!));

    return this.topic().subscriberIds.includes(this.currentUserId()!);
  });
}
