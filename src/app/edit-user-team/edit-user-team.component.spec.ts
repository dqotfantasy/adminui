import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserTeamComponent } from './edit-user-team.component';

describe('EditUserTeamComponent', () => {
  let component: EditUserTeamComponent;
  let fixture: ComponentFixture<EditUserTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
