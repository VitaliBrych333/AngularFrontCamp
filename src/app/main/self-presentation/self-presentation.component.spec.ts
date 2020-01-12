import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfPresentationComponent } from './self-presentation.component';

describe('SelfPresentationComponent', () => {
  let component: SelfPresentationComponent;
  let fixture: ComponentFixture<SelfPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfPresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
