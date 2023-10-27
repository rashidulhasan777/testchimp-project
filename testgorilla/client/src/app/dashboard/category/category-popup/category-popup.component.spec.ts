import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPopupComponent } from './category-popup.component';

describe('CategoryPopupComponent', () => {
  let component: CategoryPopupComponent;
  let fixture: ComponentFixture<CategoryPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryPopupComponent]
    });
    fixture = TestBed.createComponent(CategoryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
