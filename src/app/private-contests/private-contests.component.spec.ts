import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateContestsComponent } from './private-contests.component';

describe('PrivateContestsComponent', () => {
  let component: PrivateContestsComponent;
  let fixture: ComponentFixture<PrivateContestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateContestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateContestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
