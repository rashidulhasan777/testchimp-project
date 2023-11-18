import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesttakerCamComponent } from './testtaker-cam.component';

describe('TesttakerCamComponent', () => {
  let component: TesttakerCamComponent;
  let fixture: ComponentFixture<TesttakerCamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TesttakerCamComponent],
    });
    fixture = TestBed.createComponent(TesttakerCamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
