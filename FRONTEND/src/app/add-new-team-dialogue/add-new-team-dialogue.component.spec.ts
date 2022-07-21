import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTeamDialogueComponent } from './add-new-team-dialogue.component';

describe('AddNewTeamDialogueComponent', () => {
  let component: AddNewTeamDialogueComponent;
  let fixture: ComponentFixture<AddNewTeamDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewTeamDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewTeamDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
