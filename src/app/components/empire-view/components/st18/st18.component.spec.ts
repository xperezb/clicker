import { ComponentFixture, TestBed } from '@angular/core/testing';

import { St18Component } from './st18.component';

describe('St18Component', () => {
  let component: St18Component;
  let fixture: ComponentFixture<St18Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [St18Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(St18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
