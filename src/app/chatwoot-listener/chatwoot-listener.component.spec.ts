import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatwootListenerComponent } from './chatwoot-listener.component';

describe('ChatwootListenerComponent', () => {
  let component: ChatwootListenerComponent;
  let fixture: ComponentFixture<ChatwootListenerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatwootListenerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatwootListenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
