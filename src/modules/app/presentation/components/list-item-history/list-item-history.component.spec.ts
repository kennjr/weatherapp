import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemHistoryComponent } from './list-item-history.component';

describe('ListItemHistoryComponent', () => {
  let component: ListItemHistoryComponent;
  let fixture: ComponentFixture<ListItemHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
