import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RcontrasennaPage } from './rcontrasenna.page';

describe('RcontrasennaPage', () => {
  let component: RcontrasennaPage;
  let fixture: ComponentFixture<RcontrasennaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RcontrasennaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
