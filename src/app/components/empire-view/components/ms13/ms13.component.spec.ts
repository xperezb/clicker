import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ms13Component } from './ms13.component';

describe('Ms13Component', () => {
  let component: Ms13Component;
  let fixture: ComponentFixture<Ms13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ms13Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ms13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
