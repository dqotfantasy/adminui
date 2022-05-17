import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcronComponent } from './viewcron.component';

describe('ViewcronComponent', () => {
  let component: ViewcronComponent;
  let fixture: ComponentFixture<ViewcronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewcronComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
