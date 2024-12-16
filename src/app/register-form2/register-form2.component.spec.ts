import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterForm2Component } from './register-form2.component';

describe('RegisterForm2Component', () => {
  let component: RegisterForm2Component;
  let fixture: ComponentFixture<RegisterForm2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterForm2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
