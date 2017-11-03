import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportinvoiceComponent } from './exportinvoice.component';

describe('ExportinvoiceComponent', () => {
  let component: ExportinvoiceComponent;
  let fixture: ComponentFixture<ExportinvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportinvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
