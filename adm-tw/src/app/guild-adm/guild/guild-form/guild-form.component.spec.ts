import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildFormComponent } from './guild-form.component';

describe('GuildFormComponent', () => {
  let component: GuildFormComponent;
  let fixture: ComponentFixture<GuildFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuildFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuildFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
