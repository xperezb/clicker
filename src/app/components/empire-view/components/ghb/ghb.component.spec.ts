import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GhbComponent } from './ghb.component';

describe('GhbComponent', () => {
  let component: GhbComponent;
  let fixture: ComponentFixture<GhbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GhbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GhbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
