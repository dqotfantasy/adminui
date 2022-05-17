import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardDetailsComponent } from './leaderboard-details.component';

describe('LeaderboardDetailsComponent', () => {
  let component: LeaderboardDetailsComponent;
  let fixture: ComponentFixture<LeaderboardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderboardDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
