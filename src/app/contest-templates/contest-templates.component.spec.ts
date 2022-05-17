import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {ContestTemplatesComponent} from './contest-templates.component';


describe('ContestTemplatesComponent', () => {
  let component: ContestTemplatesComponent;
  let fixture: ComponentFixture<ContestTemplatesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ContestTemplatesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
