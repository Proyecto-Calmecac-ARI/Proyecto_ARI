import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardWickOutPlan } from './dasboard-wick-out-plan';

describe('DasboardWickOutPlan', () => {
  let component: DasboardWickOutPlan;
  let fixture: ComponentFixture<DasboardWickOutPlan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasboardWickOutPlan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DasboardWickOutPlan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
