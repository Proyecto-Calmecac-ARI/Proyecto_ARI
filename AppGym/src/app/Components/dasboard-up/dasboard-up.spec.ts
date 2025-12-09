import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardUp } from './dasboard-up';

describe('DasboardUp', () => {
  let component: DasboardUp;
  let fixture: ComponentFixture<DasboardUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasboardUp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DasboardUp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
