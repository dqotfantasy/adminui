import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ContestsComponent} from './contests.component';

describe('ContestsComponent', () => {
  let component: ContestsComponent;
  let fixture: ComponentFixture<ContestsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ContestsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
