import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCardHeadComponent } from './main-card-head.component';

describe('MainCardHeadComponent', () => {
  let component: MainCardHeadComponent;
  let fixture: ComponentFixture<MainCardHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCardHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCardHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
