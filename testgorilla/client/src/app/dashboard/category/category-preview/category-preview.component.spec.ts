import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPreviewComponent } from './category-preview.component';

describe('CategoryPreviewComponent', () => {
  let component: CategoryPreviewComponent;
  let fixture: ComponentFixture<CategoryPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryPreviewComponent],
    });
    fixture = TestBed.createComponent(CategoryPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
