import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrerolledComponent } from './prerolled.component';

describe('PrerolledComponent', () => {
  let component: PrerolledComponent;
  let fixture: ComponentFixture<PrerolledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrerolledComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrerolledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
