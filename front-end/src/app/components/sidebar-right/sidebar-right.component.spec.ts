import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRightComponent } from './sidebar-right.component';

describe('SidebarRightComponent', () => {
  let component: SidebarRightComponent;
  let fixture: ComponentFixture<SidebarRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarRightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
