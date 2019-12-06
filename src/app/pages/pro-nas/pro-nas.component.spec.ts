import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProNasComponent } from './pro-nas.component';

describe('ProNasComponent', () => {
  let component: ProNasComponent;
  let fixture: ComponentFixture<ProNasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProNasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProNasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
