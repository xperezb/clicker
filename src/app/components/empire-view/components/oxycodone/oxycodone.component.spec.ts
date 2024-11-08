import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OxycodoneComponent } from './oxycodone.component';

describe('OxycodoneComponent', () => {
  let component: OxycodoneComponent;
  let fixture: ComponentFixture<OxycodoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OxycodoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OxycodoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
