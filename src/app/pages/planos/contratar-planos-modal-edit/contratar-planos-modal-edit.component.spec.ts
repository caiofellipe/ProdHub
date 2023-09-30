import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratarPlanosModalEditComponent } from './contratar-planos-modal-edit.component';

describe('ContratarPlanosModalEditComponent', () => {
  let component: ContratarPlanosModalEditComponent;
  let fixture: ComponentFixture<ContratarPlanosModalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratarPlanosModalEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratarPlanosModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
