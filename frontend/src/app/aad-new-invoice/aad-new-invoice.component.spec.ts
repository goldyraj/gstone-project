import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AadNewInvoiceComponent } from './aad-new-invoice.component';

describe('AadNewInvoiceComponent', () => {
  let component: AadNewInvoiceComponent;
  let fixture: ComponentFixture<AadNewInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AadNewInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AadNewInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
