import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FentanylComponent } from './fentanyl.component';

describe('FentanylComponent', () => {
  let component: FentanylComponent;
  let fixture: ComponentFixture<FentanylComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FentanylComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FentanylComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
