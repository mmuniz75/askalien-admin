import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopanswersComponent } from './topanswers.component';

describe('TopanswersComponent', () => {
  let component: TopanswersComponent;
  let fixture: ComponentFixture<TopanswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopanswersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopanswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
