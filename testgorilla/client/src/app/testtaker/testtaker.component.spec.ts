import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesttakerComponent } from './testtaker.component';

describe('TesttakerComponent', () => {
  let component: TesttakerComponent;
  let fixture: ComponentFixture<TesttakerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TesttakerComponent],
    });
    fixture = TestBed.createComponent(TesttakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
