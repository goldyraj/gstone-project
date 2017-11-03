import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewinvoiceComponent } from './addnewinvoice.component';

describe('AddnewinvoiceComponent', () => {
  let component: AddnewinvoiceComponent;
  let fixture: ComponentFixture<AddnewinvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewinvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
