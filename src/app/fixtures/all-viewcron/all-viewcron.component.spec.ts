import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllViewcronComponent } from './all-viewcron.component';

describe('AllViewcronComponent', () => {
  let component: AllViewcronComponent;
  let fixture: ComponentFixture<AllViewcronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllViewcronComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllViewcronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
