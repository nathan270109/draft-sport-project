import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Produtos } from './produtos';
import { ProdutosApiService } from './produtos-api.service';

describe('Produtos', () => {
  let component: Produtos;
  let fixture: ComponentFixture<Produtos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Produtos],
      providers: [
        provideRouter([]),
        {
          provide: ProdutosApiService,
          useValue: { list: () => of([]) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Produtos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
