import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGroupPostComponent } from './show-group-post.component';

describe('ShowGroupPostComponent', () => {
  let component: ShowGroupPostComponent;
  let fixture: ComponentFixture<ShowGroupPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowGroupPostComponent]
    });
    fixture = TestBed.createComponent(ShowGroupPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
