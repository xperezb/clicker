import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CigsComponent } from './cigs.component';

describe('CigsComponent', () => {
  let component: CigsComponent;
  let fixture: ComponentFixture<CigsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CigsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
