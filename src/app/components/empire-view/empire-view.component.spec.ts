import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpireViewComponent } from './empire-view.component';


describe('ScoreComponent', () => {
  let component: EmpireViewComponent;
  let fixture: ComponentFixture<EmpireViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpireViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpireViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
