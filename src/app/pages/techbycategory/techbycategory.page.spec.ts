import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechbycategoryPage } from './techbycategory.page';

describe('TechbycategoryPage', () => {
  let component: TechbycategoryPage;
  let fixture: ComponentFixture<TechbycategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechbycategoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechbycategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
