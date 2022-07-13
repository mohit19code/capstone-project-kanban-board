import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteDialogueComponent } from './invite-dialogue.component';

describe('InviteDialogueComponent', () => {
  let component: InviteDialogueComponent;
  let fixture: ComponentFixture<InviteDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
