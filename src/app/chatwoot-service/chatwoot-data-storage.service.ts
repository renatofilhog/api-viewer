import { Injectable } from '@angular/core';

const CHATWOOT_KEY = 'chatwoot-data';

@Injectable({
  providedIn: 'root'
})
export class ChatwootDataStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public static saveChatwootData(data: string): void {
    window.sessionStorage.removeItem(CHATWOOT_KEY);
    window.sessionStorage.setItem(CHATWOOT_KEY, data);
  }

  public static getChatwootData(): string | null {
    return window.sessionStorage.getItem(CHATWOOT_KEY);
  }

}
