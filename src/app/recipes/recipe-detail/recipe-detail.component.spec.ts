import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import * as RecipesActions from "../store/recipe.actions";
import * as ShoppingListActions from "../../shopping-list/store/shopping-list.actions";
import { RecipeDetailComponent } from "./recipe-detail.component";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from "@angular/platform-browser-dynamic/testing";

describe("RecipeDetailComponent", () => {
  let component: RecipeDetailComponent;
  let fixture: ComponentFixture<RecipeDetailComponent>;
  let activatedRouteMock: any;
  let routerMock: any;
  let storeMock: any;

  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  beforeEach(() => {
    activatedRouteMock = {
      params: of({ id: "0" }),
    };
    routerMock = {
      navigate: jest.fn(),
    };
    storeMock = {
      select: jest.fn(() =>
        of({
          recipes: [
            {
              name: "Recipe 1",
              description: "",
              imagePath: "",
              ingredients: [
                {
                  name: "Ingredient",
                  amount: 1,
                },
              ],
            },
          ],
        })
      ),
      dispatch: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [RecipeDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock },
        { provide: Store, useValue: storeMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should get recipe details on init", () => {
    expect(component.recipe).toEqual({
      name: "Recipe 1",
      description: "",
      imagePath: "",
      ingredients: [
        {
          name: "Ingredient",
          amount: 1,
        },
      ],
    });
  });

  it("should add recipe ingredients to shopping list", () => {
    component.onAddToShoppingList();
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      new ShoppingListActions.AddIngredients([
        {
          name: "Ingredient",
          amount: 1,
        },
      ])
    );
  });

  it("should navigate to recipe edit page", () => {
    component.onEditRecipe();
    expect(routerMock.navigate).toHaveBeenCalledWith(["edit"], {
      relativeTo: activatedRouteMock,
    });
  });

  it("should delete recipe and navigate to recipe list", () => {
    component.onDeleteRecipe();
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      new RecipesActions.DeleteRecipe(0)
    );
    expect(routerMock.navigate).toHaveBeenCalledWith(["/recipes"]);
  });
});
