import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaManifestacaoComponent } from './nova-manifestacao.component';

describe('NovaManifestacaoComponent', () => {
  let component: NovaManifestacaoComponent;
  let fixture: ComponentFixture<NovaManifestacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaManifestacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovaManifestacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
