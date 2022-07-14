import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskDialogueComponent } from './add-task-dialogue.component';

describe('AddTaskDialogueComponent', () => {
  let component: AddTaskDialogueComponent;
  let fixture: ComponentFixture<AddTaskDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaskDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
