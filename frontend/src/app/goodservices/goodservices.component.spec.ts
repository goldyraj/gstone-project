import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodservicesComponent } from './goodservices.component';

describe('GoodservicesComponent', () => {
  let component: GoodservicesComponent;
  let fixture: ComponentFixture<GoodservicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodservicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
