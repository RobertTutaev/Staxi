/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PunktsComponent } from './punkts.component';

describe('ServePunktComponent', () => {
  let component: PunktsComponent;
  let fixture: ComponentFixture<PunktsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PunktsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PunktsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
