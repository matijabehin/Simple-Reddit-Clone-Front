import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupControllerComponent } from './group-controller.component';

describe('GroupControllerComponent', () => {
  let component: GroupControllerComponent;
  let fixture: ComponentFixture<GroupControllerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupControllerComponent]
    });
    fixture = TestBed.createComponent(GroupControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
