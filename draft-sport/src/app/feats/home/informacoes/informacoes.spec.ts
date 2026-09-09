import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Informacoes } from './informacoes';

describe('Informacoes', () => {
  let component: Informacoes;
  let fixture: ComponentFixture<Informacoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Informacoes],
    }).compileComponents();

    fixture = TestBed.createComponent(Informacoes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
