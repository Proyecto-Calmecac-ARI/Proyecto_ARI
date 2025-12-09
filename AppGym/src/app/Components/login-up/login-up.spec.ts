import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUp } from './login-up';

describe('LoginUp', () => {
  let component: LoginUp;
  let fixture: ComponentFixture<LoginUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginUp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginUp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
