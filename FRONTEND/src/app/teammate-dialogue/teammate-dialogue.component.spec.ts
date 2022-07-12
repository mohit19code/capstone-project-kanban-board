import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeammateDialogueComponent } from './teammate-dialogue.component';

describe('TeammateDialogueComponent', () => {
  let component: TeammateDialogueComponent;
  let fixture: ComponentFixture<TeammateDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeammateDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeammateDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
