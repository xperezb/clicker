import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeaAgentComponent } from './dea-agent.component';

describe('DeaAgentComponent', () => {
  let component: DeaAgentComponent;
  let fixture: ComponentFixture<DeaAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeaAgentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeaAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
