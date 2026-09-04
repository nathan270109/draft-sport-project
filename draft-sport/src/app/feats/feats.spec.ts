import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Feats } from './feats';

describe('Feats', () => {
  let component: Feats;
  let fixture: ComponentFixture<Feats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Feats],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Feats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
