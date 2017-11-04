import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoodsComponent } from './admin-goods.component';

describe('AdminGoodsComponent', () => {
  let component: AdminGoodsComponent;
  let fixture: ComponentFixture<AdminGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
