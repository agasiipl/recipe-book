// import { TestBed } from "@angular/core/testing";
// import { RouterTestingModule } from "@angular/router/testing";
// import { Router, Route } from "@angular/router";
// import { AppRoutingModule } from "./app-routing.module";
// import {
//   BrowserDynamicTestingModule,
//   platformBrowserDynamicTesting,
// } from "@angular/platform-browser-dynamic/testing";
// import {
//   ActionsSubject,
//   ReducerManager,
//   ReducerManagerDispatcher,
//   StateObservable,
//   Store,
// } from "@ngrx/store";
// import { InjectionToken } from "@angular/core";
// import { AuthGuard } from "./auth/auth.guard";
// import { AuthService } from "./auth/auth.service";
// import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/compiler";

// describe("AppRoutingModule", () => {
//   let router: Router;

//   beforeAll(() => {
//     TestBed.initTestEnvironment(
//       BrowserDynamicTestingModule,
//       platformBrowserDynamicTesting()
//     );
//   });

//   beforeEach(() =>
//     TestBed.configureTestingModule({
//       imports: [RouterTestingModule.withRoutes([]), AppRoutingModule],
//       providers: [
//         Store,
//         StateObservable,
//         ActionsSubject,
//         ReducerManager,
//         ReducerManagerDispatcher,
//         AuthGuard,
//         AuthService,
//         InjectionToken,
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA],
//     })
//   );

//   beforeEach(() => {
//     router = TestBed.inject(Router);
//     router.initialNavigation();
//   });

//   it("should create the app routing module", () => {
//     const appRoutingModule = TestBed.inject(AppRoutingModule);
//     expect(appRoutingModule).toBeTruthy();
//   });

//   // it("should have the correct routes", () => {
//   //   const routes: Route[] = router.config;
//   //   expect(routes).toEqual([
//   //     {
//   //       path: "",
//   //       redirectTo: "/recipes",
//   //       pathMatch: "full",
//   //     },
//   //   ]);
//   // });
// });
