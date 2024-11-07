import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethComponent } from './meth.component';

describe('MethComponent', () => {
  let component: MethComponent;
  let fixture: ComponentFixture<MethComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MethComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MethComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
