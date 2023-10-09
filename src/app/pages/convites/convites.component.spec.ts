import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvitesComponent } from './convites.component';

describe('ConvitesComponent', () => {
  let component: ConvitesComponent;
  let fixture: ComponentFixture<ConvitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
