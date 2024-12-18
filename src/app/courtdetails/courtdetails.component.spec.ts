import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtdetailsComponent } from './courtdetails.component';

describe('CourtdetailsComponent', () => {
  let component: CourtdetailsComponent;
  let fixture: ComponentFixture<CourtdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourtdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
