import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Carrossel } from './carrossel';

describe('Carrossel', () => {
  let component: Carrossel;
  let fixture: ComponentFixture<Carrossel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carrossel, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Carrossel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
