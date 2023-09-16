import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConhecerEmpresaComponent } from './conhecer-empresa.component';

describe('ConhecerEmpresaComponent', () => {
  let component: ConhecerEmpresaComponent;
  let fixture: ComponentFixture<ConhecerEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConhecerEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConhecerEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
