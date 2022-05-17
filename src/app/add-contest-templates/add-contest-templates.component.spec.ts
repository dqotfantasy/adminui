import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContestTemplatesComponent } from './add-contest-templates.component';

describe('AddContestTemplatesComponent', () => {
  let component: AddContestTemplatesComponent;
  let fixture: ComponentFixture<AddContestTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContestTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContestTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
