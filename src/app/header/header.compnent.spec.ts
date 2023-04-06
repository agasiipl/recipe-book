import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from "@angular/platform-browser-dynamic/testing";

import { Store, StoreModule } from "@ngrx/store";
import { HeaderComponent } from "./header.component";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "./../auth/store/auth.actions";
import * as RecipesActions from "../recipes/store/recipe.actions";
import { By } from "@angular/platform-browser";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: Store<fromApp.AppState>;

  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [StoreModule.forRoot(fromApp.appReducer)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch StoreRecipes action when onSaveData is called", () => {
    const spy = jest.spyOn(store, "dispatch");
    component.onSaveData();
    expect(spy).toHaveBeenCalledWith(new RecipesActions.StoreRecipes());
  });

  it("should dispatch FetchRecipes action when onFetchData is called", () => {
    const spy = jest.spyOn(store, "dispatch");
    component.onFetchData();
    expect(spy).toHaveBeenCalledWith(new RecipesActions.FetchRecipes());
  });

  it("should dispatch Logout action when onLogout is called", () => {
    const spy = jest.spyOn(store, "dispatch");
    component.onLogout();
    expect(spy).toHaveBeenCalledWith(new AuthActions.Logout());
  });

  it("should unsubscribe from user subscription on destroy", () => {
    jest.spyOn(component.userSub, "unsubscribe");
    component.ngOnDestroy();
    expect(component.userSub.unsubscribe).toHaveBeenCalled();
  });

  it("should not render logout button if not authenticated", () => {
    component.isAuthenticated = false;
    fixture.detectChanges();
    const logoutButton = fixture.debugElement.query(By.css(".logout-button"));
    expect(logoutButton).toBeFalsy();
  });
});
