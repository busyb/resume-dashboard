import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileLoadComponent } from './file-load.component';

describe('FileLoadComponent', () => {
  let component: FileLoadComponent;
  let fixture: ComponentFixture<FileLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
