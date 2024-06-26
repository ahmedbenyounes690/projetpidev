import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimadminComponent } from './claimadmin.component';

describe('ClaimadminComponent', () => {
  let component: ClaimadminComponent;
  let fixture: ComponentFixture<ClaimadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
