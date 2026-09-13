import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompraRealizada } from './compra-realizada';

describe('CompraRealizada', () => {
  let component: CompraRealizada;
  let fixture: ComponentFixture<CompraRealizada>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompraRealizada],
    }).compileComponents();

    fixture = TestBed.createComponent(CompraRealizada);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
