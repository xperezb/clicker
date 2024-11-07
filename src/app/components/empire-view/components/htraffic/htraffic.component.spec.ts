import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtrafficComponent } from './htraffic.component';

describe('HtrafficComponent', () => {
  let component: HtrafficComponent;
  let fixture: ComponentFixture<HtrafficComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HtrafficComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HtrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
