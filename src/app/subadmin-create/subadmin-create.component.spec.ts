import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminCreateComponent } from './subadmin-create.component';

describe('SubadminCreateComponent', () => {
  let component: SubadminCreateComponent;
  let fixture: ComponentFixture<SubadminCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubadminCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadminCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
