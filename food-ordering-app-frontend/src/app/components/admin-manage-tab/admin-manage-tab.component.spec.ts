import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageTabComponent } from './admin-manage-tab.component';

describe('AdminManageTabComponent', () => {
  let component: AdminManageTabComponent;
  let fixture: ComponentFixture<AdminManageTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManageTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManageTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
