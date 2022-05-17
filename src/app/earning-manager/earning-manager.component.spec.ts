import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningMangerComponent } from './earning-manager.component';

describe('EarningMangerComponent', () => {
  let component: EarningMangerComponent;
  let fixture: ComponentFixture<EarningMangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarningMangerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EarningMangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
