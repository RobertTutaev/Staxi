/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KategComponent } from './kateg.component';

describe('KategComponent', () => {
  let component: KategComponent;
  let fixture: ComponentFixture<KategComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KategComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KategComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
