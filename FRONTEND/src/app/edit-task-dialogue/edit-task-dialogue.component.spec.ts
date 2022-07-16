import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskDialogueComponent } from './edit-task-dialogue.component';

describe('EditTaskDialogueComponent', () => {
  let component: EditTaskDialogueComponent;
  let fixture: ComponentFixture<EditTaskDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTaskDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
