import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDiscardDialogComponent } from './cart-discard-dialog.component';

describe('CartDiscardDialogComponent', () => {
  let component: CartDiscardDialogComponent;
  let fixture: ComponentFixture<CartDiscardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartDiscardDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartDiscardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
