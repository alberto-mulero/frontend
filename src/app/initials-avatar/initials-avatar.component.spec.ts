import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialsAvatarComponent } from './initials-avatar.component';

describe('InitialsAvatarComponent', () => {
  let component: InitialsAvatarComponent;
  let fixture: ComponentFixture<InitialsAvatarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InitialsAvatarComponent]
    });
    fixture = TestBed.createComponent(InitialsAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
