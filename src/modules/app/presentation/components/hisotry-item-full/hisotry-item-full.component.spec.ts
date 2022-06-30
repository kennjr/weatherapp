import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HisotryItemFullComponent } from './hisotry-item-full.component';

describe('HisotryItemFullComponent', () => {
  let component: HisotryItemFullComponent;
  let fixture: ComponentFixture<HisotryItemFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HisotryItemFullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HisotryItemFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
