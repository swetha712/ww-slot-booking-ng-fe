import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRegisterForm3Component } from './app-register-form3.component';

describe('AppRegisterForm3Component', () => {
  let component: AppRegisterForm3Component;
  let fixture: ComponentFixture<AppRegisterForm3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRegisterForm3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppRegisterForm3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
