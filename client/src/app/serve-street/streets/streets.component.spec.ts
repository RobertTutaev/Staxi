/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StreetsComponent } from './streets.component';

describe('ServeStreetsComponent', () => {
  let component: StreetsComponent;
  let fixture: ComponentFixture<StreetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
