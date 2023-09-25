import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratarPlanosComponent } from './contratar-planos.component';

describe('ContratarPlanosComponent', () => {
  let component: ContratarPlanosComponent;
  let fixture: ComponentFixture<ContratarPlanosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratarPlanosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratarPlanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
