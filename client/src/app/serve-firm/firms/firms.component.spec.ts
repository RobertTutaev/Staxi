/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FirmsComponent } from './firms.component';

describe('ServeFirmsComponent', () => {
  let component: FirmsComponent;
  let fixture: ComponentFixture<FirmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
