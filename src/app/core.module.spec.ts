import { TestBed } from "@angular/core/testing";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { CoreModule } from "./core.module";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from "@angular/platform-browser-dynamic/testing";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import {
  ActionsSubject,
  ReducerManager,
  ReducerManagerDispatcher,
  StateObservable,
  Store,
  StoreModule,
} from "@ngrx/store";
import { AuthService } from "./auth/auth.service";
import * as fromApp from "./store/app.reducer";

describe("CoreModule", () => {
  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, StoreModule.forRoot(fromApp.appReducer)],
      providers: [
        Store,
        StateObservable,
        ActionsSubject,
        ReducerManager,
        ReducerManagerDispatcher,
        AuthService,
        AuthInterceptorService,
      ],
    });
  });

  it("should provide HTTP_INTERCEPTORS with AuthInterceptorService", () => {
    const httpInterceptors = TestBed.inject(HTTP_INTERCEPTORS);
    const authInterceptorService = TestBed.inject(AuthInterceptorService);

    expect(httpInterceptors).toEqual([authInterceptorService]);
  });
});
