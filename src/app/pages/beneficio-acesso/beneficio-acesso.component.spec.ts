import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficioAcessoComponent } from './beneficio-acesso.component';

describe('BeneficioAcessoComponent', () => {
  let component: BeneficioAcessoComponent;
  let fixture: ComponentFixture<BeneficioAcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficioAcessoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficioAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
