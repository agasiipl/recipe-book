import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Router, Route } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from "@angular/platform-browser-dynamic/testing";
import {
  ActionsSubject,
  ReducerManager,
  ReducerManagerDispatcher,
  StateObservable,
  Store,
  StoreModule,
} from "@ngrx/store";
import { AuthService } from "./auth/auth.service";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import * as fromApp from "./store/app.reducer";

describe("AppRoutingModule", () => {
  let router: Router;
  let store: Store<fromApp.AppState>;

  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        AppRoutingModule,
        StoreModule.forRoot(fromApp.appReducer),
      ],
      providers: [
        Store,
        StateObservable,
        ActionsSubject,
        ReducerManager,
        ReducerManagerDispatcher,
        AuthService,
        AuthInterceptorService,
      ],
    })
  );

  beforeEach(() => {
    router = TestBed.inject(Router);
    router.initialNavigation();
  });

  it("should create the app routing module", () => {
    const appRoutingModule = TestBed.inject(AppRoutingModule);
    expect(appRoutingModule).toBeTruthy();
  });

  // it("should have the correct routes", () => {
  //   const routes: Route[] = router.config;
  //   expect(routes).toEqual([
  //     {
  //       path: "",
  //       redirectTo: "/recipes",
  //       pathMatch: "full",
  //     },
  //   ]);
  // });
});
