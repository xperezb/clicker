import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocaineComponent } from './cocaine.component';

describe('CocaineComponent', () => {
  let component: CocaineComponent;
  let fixture: ComponentFixture<CocaineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocaineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
