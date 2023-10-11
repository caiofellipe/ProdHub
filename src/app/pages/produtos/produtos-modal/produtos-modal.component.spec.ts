import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosModalComponent } from './produtos-modal.component';

describe('ProdutoModalComponent', () => {
  let component: ProdutosModalComponent;
  let fixture: ComponentFixture<ProdutosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
