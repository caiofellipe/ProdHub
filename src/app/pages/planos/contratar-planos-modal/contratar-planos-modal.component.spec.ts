import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratarPlanosModalComponent } from './contratar-planos-modal.component';

describe('ContratarPlanosModalComponent', () => {
  let component: ContratarPlanosModalComponent;
  let fixture: ComponentFixture<ContratarPlanosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratarPlanosModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratarPlanosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
