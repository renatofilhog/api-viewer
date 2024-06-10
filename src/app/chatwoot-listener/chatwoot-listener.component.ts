import {Component, OnDestroy, OnInit} from '@angular/core';
import {isJSONValid} from "../util/utils";
import {ChatwootDataStorageService as Service} from "../chatwoot-service/chatwoot-data-storage.service";

@Component({
  selector: 'app-chatwoot-listener',
  templateUrl: './chatwoot-listener.component.html',
  styleUrls: ['./chatwoot-listener.component.css']
})
export class ChatwootListenerComponent  implements OnInit, OnDestroy {

  constructor() {}

  ngOnInit() {
    window.addEventListener('message', this.handleMessage);
  }

  ngOnDestroy() {
    window.removeEventListener('message', this.handleMessage);
  }

  handleMessage(event: MessageEvent) {
    if (!isJSONValid(event.data)) {
      return;
    }

    const eventData = JSON.parse(event.data);
    console.log('Received data from Chatwoot:', eventData);
    Service.saveChatwootData(JSON.stringify(eventData));
  }
}
