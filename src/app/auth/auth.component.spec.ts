import { NgForm } from "@angular/forms";

import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from "@angular/platform-browser-dynamic/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StoreModule, Store } from "@ngrx/store";
import { FormsModule } from "@angular/forms";
import { of } from "rxjs";
import { AuthComponent } from "./auth.component";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "./store/auth.actions";

describe("AuthComponent", () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let store: Store<fromApp.AppState>;

  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [FormsModule, StoreModule.forRoot(fromApp.appReducer)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch LoginStart action on form submit when in login mode", () => {
    const form: NgForm = {
      valid: true,
      value: { email: "test@example.com", password: "password" },
      reset: jest.fn(),
    } as unknown as NgForm;
    component.isLoginMode = true;
    const dispatchSpy = jest.spyOn(store, "dispatch");
    component.onSubmit(form as NgForm);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new AuthActions.LoginStart({
        email: form.value.email,
        password: form.value.password,
      })
    );
    expect(form.reset).toHaveBeenCalled();
  });

  it("should dispatch SignupStart action on form submit when in signup mode", () => {
    const form: NgForm = {
      valid: true,
      value: { email: "test@test.com", password: "password" },
      reset: jest.fn(),
    } as unknown as NgForm;

    const dispatchSpy = jest.spyOn(store, "dispatch");
    component.isLoginMode = false;
    component.onSubmit(form as any);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new AuthActions.SignupStart({
        email: "test@test.com",
        password: "password",
      })
    );
  });

  it("should not dispatch any action on form submit when form is invalid", () => {
    const form: NgForm = {
      valid: false,
      value: {},
      reset: jest.fn(),
    } as unknown as NgForm;

    const dispatchSpy = jest.spyOn(store, "dispatch");
    component.onSubmit(form as any);
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it("should set isLoading to true when loading from store", () => {
    const storeSpy = jest
      .spyOn(store, "select")
      .mockReturnValue(of({ loading: true }));
    component.ngOnInit();
    expect(storeSpy).toHaveBeenCalled();
    expect(component.isLoading).toBeTruthy();
  });

  it("should set error to null when no authError from store", () => {
    const storeSpy = jest
      .spyOn(store, "select")
      .mockReturnValue(of({ loading: false, authError: null }));
    component.ngOnInit();
    expect(storeSpy).toHaveBeenCalled();
    expect(component.error).toBeNull();
  });

  it("should set error and show alert when authError from store", () => {
    const storeSpy = jest
      .spyOn(store, "select")
      .mockReturnValue(
        of({ loading: false, authError: "Invalid credentials" })
      );
    const showErrorAlertSpy = jest.spyOn(component as any, "showErrorAlert");
    component.ngOnInit();
    expect(storeSpy).toHaveBeenCalled();
    expect(component.error).toBe("Invalid credentials");
    expect(showErrorAlertSpy).toHaveBeenCalledWith("Invalid credentials");
  });

  it("should clear error when onHandleError is called", () => {
    const dispatchSpy = jest.spyOn(store, "dispatch");
    component.onHandleError();
    expect(dispatchSpy).toHaveBeenCalledWith(new AuthActions.ClearError());
  });
});
