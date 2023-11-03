import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficioAcessoFormComponent } from './beneficio-acesso-form.component';

describe('BeneficioAcessoFormComponent', () => {
  let component: BeneficioAcessoFormComponent;
  let fixture: ComponentFixture<BeneficioAcessoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficioAcessoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficioAcessoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
