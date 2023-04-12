import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from "@angular/platform-browser-dynamic/testing";
import { AlertComponent } from "./alert.component";
0;
describe("AlertComponent", () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should emit close event when backdrop is clicked", () => {
    const spy = jest.spyOn(component.close, "emit");
    const backdropEl = fixture.debugElement.query(By.css(".backdrop"));
    backdropEl.triggerEventHandler("click", null);
    expect(spy).toHaveBeenCalled();
  });

  it("should emit close event when close button is clicked", () => {
    const spy = jest.spyOn(component.close, "emit");
    const closeButtonEl = fixture.debugElement.query(By.css(".btn-primary"));
    closeButtonEl.triggerEventHandler("click", null);
    expect(spy).toHaveBeenCalled();
  });

  it("should display the message", () => {
    const message = "Test message";
    component.message = message;
    fixture.detectChanges();
    const messageEl = fixture.debugElement.query(By.css(".alert-box p"));
    expect(messageEl.nativeElement.textContent).toContain(message);
  });
});
