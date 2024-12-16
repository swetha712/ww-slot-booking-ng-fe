import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterForm4Component } from './register-form4.component';

describe('RegisterForm4Component', () => {
  let component: RegisterForm4Component;
  let fixture: ComponentFixture<RegisterForm4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterForm4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterForm4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
