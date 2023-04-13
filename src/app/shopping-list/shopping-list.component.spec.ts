import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StoreModule } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list.component";
import * as ShoppingListActions from "./store/shopping-list.actions";
import * as fromApp from "../store/app.reducer";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from "@angular/platform-browser-dynamic/testing";

describe("ShoppingListComponent", () => {
  let component: ShoppingListComponent;
  let fixture: ComponentFixture<ShoppingListComponent>;
  let mockStore: MockStore<fromApp.AppState>;
  const initialState = { shoppingList: { ingredients: [] } };

  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoppingListComponent],
      imports: [StoreModule.forRoot(fromApp.appReducer)],
      providers: [provideMockStore({ initialState })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingListComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch StartEdit action onEditItem()", () => {
    jest.spyOn(mockStore, "dispatch");
    const index = 0;
    component.onEditItem(index);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      new ShoppingListActions.StartEdit(index)
    );
  });
});
