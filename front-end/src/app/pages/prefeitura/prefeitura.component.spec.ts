import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefeituraComponent } from './prefeitura.component';

describe('PrefeituraComponent', () => {
  let component: PrefeituraComponent;
  let fixture: ComponentFixture<PrefeituraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrefeituraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrefeituraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
