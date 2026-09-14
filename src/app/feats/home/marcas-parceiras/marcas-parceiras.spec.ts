import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MarcasParceiras } from './marcas-parceiras';

describe('MarcasParceiras', () => {
  let component: MarcasParceiras;
  let fixture: ComponentFixture<MarcasParceiras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcasParceiras, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MarcasParceiras);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
