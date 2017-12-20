import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegalosComponent } from './regalos.component';

describe('RegalosComponent', () => {
  let component: RegalosComponent;
  let fixture: ComponentFixture<RegalosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegalosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegalosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
