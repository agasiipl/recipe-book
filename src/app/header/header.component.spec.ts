import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from "@angular/platform-browser-dynamic/testing";

import { StoreModule } from "@ngrx/store";
import { HeaderComponent } from "./header.component";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "../auth/store/auth.actions";
import * as RecipesActions from "../recipes/store/recipe.actions";
import { By } from "@angular/platform-browser";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { User } from "../auth/user-model";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore<Partial<fromApp.AppState>>;

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
      providers: [
        provideMockStore<Partial<fromApp.AppState>>({
          initialState: {
            auth: {
              user: {
                email: "adrabczyk90@gmail.com",
                id: "1",
                _token: "ABC",
                token: "ABC",
                _tokenExpirationDate: new Date("11.04.2023"),
              },
              authError: "",
              loading: false,
            },
          },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
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

  it("should not render logout button if not authenticated", () => {
    fixture.detectChanges();
    const logoutButton = fixture.debugElement.query(By.css(".logout-button"));
    expect(logoutButton).toBeFalsy();
  });

  it("should set isAuthenticated$ to false when user is not logged in", () => {
    const expectedValue = new User(
      "adrabczyk90@gmail.com",
      "1",
      "ABC",
      new Date("11.04.2023")
    );
    const mockState = {
      auth: {
        user: expectedValue,
        authError: "",
        loading: false,
      },
    };
    store.setState(mockState);

    const isAuthenticated$ = component.isAuthenticated$;
    isAuthenticated$.subscribe((result) => {
      expect(result).toEqual(expectedValue);
    });
  });
});
