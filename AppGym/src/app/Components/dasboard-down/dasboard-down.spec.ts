import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardDown } from './dasboard-down';

describe('DasboardDown', () => {
  let component: DasboardDown;
  let fixture: ComponentFixture<DasboardDown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasboardDown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DasboardDown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
