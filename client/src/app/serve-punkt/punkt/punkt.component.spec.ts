/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PunktComponent } from './punkt.component';

describe('PunktComponent', () => {
  let component: PunktComponent;
  let fixture: ComponentFixture<PunktComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PunktComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PunktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
