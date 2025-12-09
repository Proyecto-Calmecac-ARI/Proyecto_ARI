import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardMedium } from './dasboard-medium';

describe('DasboardMedium', () => {
  let component: DasboardMedium;
  let fixture: ComponentFixture<DasboardMedium>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasboardMedium]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DasboardMedium);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
