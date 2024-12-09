import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterForm3Component } from './register-form3.component';

describe('RegisterForm3Component', () => {
  let component: RegisterForm3Component;
  let fixture: ComponentFixture<RegisterForm3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterForm3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterForm3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
