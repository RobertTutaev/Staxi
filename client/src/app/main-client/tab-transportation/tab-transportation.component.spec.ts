/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabTransportationComponent } from './tab-transportation.component';

describe('TabTransportationComponent', () => {
  let component: TabTransportationComponent;
  let fixture: ComponentFixture<TabTransportationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabTransportationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabTransportationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
