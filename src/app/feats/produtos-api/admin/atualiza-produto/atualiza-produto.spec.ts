import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtualizaProduto } from './atualiza-produto';

describe('AtualizaProduto', () => {
  let component: AtualizaProduto;
  let fixture: ComponentFixture<AtualizaProduto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtualizaProduto],
    }).compileComponents();

    fixture = TestBed.createComponent(AtualizaProduto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
