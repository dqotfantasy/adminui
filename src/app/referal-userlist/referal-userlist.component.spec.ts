import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferalUserlistComponent } from './referal-userlist.component';

describe('ReferalUserlistComponent', () => {
  let component: ReferalUserlistComponent;
  let fixture: ComponentFixture<ReferalUserlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferalUserlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferalUserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
