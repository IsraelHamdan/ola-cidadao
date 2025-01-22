import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditManifestationComponent } from './edit-manifestation.component';

describe('EditManifestationComponent', () => {
  let component: EditManifestationComponent;
  let fixture: ComponentFixture<EditManifestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditManifestationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditManifestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
