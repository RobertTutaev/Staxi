/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KategoryComponent } from './kategory.component';

describe('KategoryComponent', () => {
  let component: KategoryComponent;
  let fixture: ComponentFixture<KategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
