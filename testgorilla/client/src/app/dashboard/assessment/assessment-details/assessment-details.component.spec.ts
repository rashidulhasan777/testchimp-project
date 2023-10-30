import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentDetailsComponent } from './assessment-details.component';

describe('AssessmentDetailsComponent', () => {
  let component: AssessmentDetailsComponent;
  let fixture: ComponentFixture<AssessmentDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssessmentDetailsComponent],
    });
    fixture = TestBed.createComponent(AssessmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
