import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGuildFormComponent } from './user-guild-form.component';

describe('UserGuildFormComponent', () => {
  let component: UserGuildFormComponent;
  let fixture: ComponentFixture<UserGuildFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserGuildFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGuildFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
