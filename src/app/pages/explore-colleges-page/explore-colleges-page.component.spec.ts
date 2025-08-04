import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorePageComponent } from './explore-colleges-page.component';

describe('ExploreCollegesPageComponent', () => {
  let component: ExplorePageComponent;
  let fixture: ComponentFixture<ExplorePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExplorePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExplorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
