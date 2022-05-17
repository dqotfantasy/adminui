import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoterIncomeComponent } from './promoter-income.component';

describe('PromoterIncomeComponent', () => {
  let component: PromoterIncomeComponent;
  let fixture: ComponentFixture<PromoterIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoterIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoterIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
