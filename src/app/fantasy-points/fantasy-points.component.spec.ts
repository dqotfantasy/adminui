import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {FantasyPointsComponent} from './fantasy-points.component';

describe('FantasyPointsComponent', () => {
  let component: FantasyPointsComponent;
  let fixture: ComponentFixture<FantasyPointsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FantasyPointsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FantasyPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
