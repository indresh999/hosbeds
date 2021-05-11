import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListModalPage } from './category-list-modal.page';

describe('CategoryListModalPage', () => {
  let component: CategoryListModalPage;
  let fixture: ComponentFixture<CategoryListModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryListModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
