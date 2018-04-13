import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWordComponent } from './category-word.component';

describe('CategoryWordComponent', () => {
  let component: CategoryWordComponent;
  let fixture: ComponentFixture<CategoryWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
