import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingMediasComponent } from './existing-medias.component';

describe('ExistingMediasComponent', () => {
  let component: ExistingMediasComponent;
  let fixture: ComponentFixture<ExistingMediasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingMediasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingMediasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
