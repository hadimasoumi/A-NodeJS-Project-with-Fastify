import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockHighlowComponent } from './stock-highlow.component';

describe('StockHighlowComponent', () => {
  let component: StockHighlowComponent;
  let fixture: ComponentFixture<StockHighlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockHighlowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockHighlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
