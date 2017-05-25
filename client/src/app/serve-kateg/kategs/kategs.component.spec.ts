/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KategsComponent } from './kategs.component';

describe('ServeKategsComponent', () => {
  let component: KategsComponent;
  let fixture: ComponentFixture<KategsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KategsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KategsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
