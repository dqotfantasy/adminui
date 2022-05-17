import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsystemUserComponent } from './listsystem-user.component';

describe('ListsystemUserComponent', () => {
  let component: ListsystemUserComponent;
  let fixture: ComponentFixture<ListsystemUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsystemUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsystemUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
