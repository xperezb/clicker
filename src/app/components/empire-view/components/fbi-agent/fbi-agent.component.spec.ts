import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbiAgentComponent } from './fbi-agent.component';

describe('FbiAgentComponent', () => {
  let component: FbiAgentComponent;
  let fixture: ComponentFixture<FbiAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FbiAgentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FbiAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
