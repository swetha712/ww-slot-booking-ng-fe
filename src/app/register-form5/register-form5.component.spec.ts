import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterForm5Component } from './register-form5.component';

describe('RegisterForm5Component', () => {
  let component: RegisterForm5Component;
  let fixture: ComponentFixture<RegisterForm5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterForm5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterForm5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
