import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeletaProduto } from './deleta-produto';

describe('DeletaProduto', () => {
  let component: DeletaProduto;
  let fixture: ComponentFixture<DeletaProduto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletaProduto],
    }).compileComponents();

    fixture = TestBed.createComponent(DeletaProduto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
