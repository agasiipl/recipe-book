import { TestBed } from "@angular/core/testing";
import { Store, StoreModule } from "@ngrx/store";
import { AppComponent } from "./app.component";
import * as fromApp from "./store/app.reducer";
import * as AuthActions from "./auth/store/auth.actions";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from "@angular/platform-browser-dynamic/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { HeaderComponent } from "./header/header.component";

describe("AppComponent", () => {
  let store: Store<fromApp.AppState>;

  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(fromApp.appReducer), RouterTestingModule],
      declarations: [AppComponent, HeaderComponent],
    });

    store = TestBed.inject(Store);

    jest.spyOn(store, "dispatch");
  });

  it("should dispatch AutoLogin action on init", () => {
    const component = TestBed.createComponent(AppComponent).componentInstance;
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(new AuthActions.AutoLogin());
  });
});
