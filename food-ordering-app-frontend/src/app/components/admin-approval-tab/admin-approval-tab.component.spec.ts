import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApprovalTabComponent } from './admin-approval-tab.component';

describe('AdminApprovalTabComponent', () => {
  let component: AdminApprovalTabComponent;
  let fixture: ComponentFixture<AdminApprovalTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminApprovalTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminApprovalTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
