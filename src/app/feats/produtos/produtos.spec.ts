import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Produtos } from './produtos';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

describe('Produtos', () => {
  let component: Produtos;
  let fixture: ComponentFixture<Produtos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Produtos],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Produtos);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve filtrar os produtos pela busca no catálogo', async () => {
    component.termoBusca = 'asics';
    fixture.detectChanges();
    await fixture.whenStable();

    const cards = fixture.nativeElement.querySelectorAll('.card-produto');

    expect(cards.length).toBe(1);
    expect(cards[0].textContent).toContain('Tênis Asics Gel Excite');
  });

  it('deve mostrar o estado vazio quando não encontrar produtos', async () => {
    component.termoBusca = 'produto que não existe';
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain(
      'Nenhum produto encontrado.',
    );
  });
});
