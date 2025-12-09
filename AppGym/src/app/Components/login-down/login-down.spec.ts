import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDown } from './login-down';

describe('LoginDown', () => {
  let component: LoginDown;
  let fixture: ComponentFixture<LoginDown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginDown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginDown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
