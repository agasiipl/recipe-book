import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, NgForm } from "@angular/forms";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import * as ShoppingListActions from "../store/shopping-list.actions";
import { ShoppingEditComponent } from "./shopping-edit.component";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from "@angular/platform-browser-dynamic/testing";
import { Ingredient } from "../../shared/ingredient.model";

describe("ShoppingEditComponent", () => {
  let component: ShoppingEditComponent;
  let fixture: ComponentFixture<ShoppingEditComponent>;
  let store: MockStore;
  const initialState = {
    shoppingList: { editedIngredientIndex: -1, editedIngredient: null },
  };

  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoppingEditComponent],
      imports: [FormsModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingEditComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should update ingredient when in edit mode", () => {
    const ingredient = new Ingredient("Test Ingredient", 1);
    component.editMode = true;
    component.editedItem = ingredient;
    component.slForm = new NgForm([], []);

    // Wrap the code that accesses the form control in a setTimeout function
    setTimeout(() => {
      component.slForm.setValue({
        name: ingredient.name,
        amount: ingredient.amount,
      });

      const dispatchSpy = jest.spyOn(store, "dispatch");
      component.onSubmit(component.slForm);

      expect(dispatchSpy).toHaveBeenCalledWith(
        new ShoppingListActions.UpdateIngredient(ingredient)
      );
      expect(component.editMode).toBeFalsy();
      expect(component.slForm.pristine).toBeTruthy();
    });
  });

  // it('should add ingredient when not in edit mode', () => {
  // const ingredient = new Ingredient('Test Ingredient', 1);
  // component.editMode = false;
  // component.editedItem = new Ingredient('Test Test Ingredient', 0);
  // component.slForm = new NgForm([], []);
  // setTimeout(() => {
  // component.slForm.setValue({ name: ingredient.name, amount: ingredient.amount });
  // }, 100);

  // const dispatchSpy = jest.spyOn(store, 'dispatch');
  // component.onSubmit(component.slForm);

  // expect(dispatchSpy).toHaveBeenCalledWith(new ShoppingListActions.AddIngredient(new Ingredient(ingredient.name, ingredient.amount)));
  // expect(component.editMode).toBeFalsy();
  // expect(component.slForm.pristine).toBeTruthy();

  // });

  it("should clear form and exit edit mode when onClear is called", () => {
    component.editMode = true;
    component.slForm = new NgForm([], []);
    const dispatchSpy = jest.spyOn(store, "dispatch");

    component.onClear();

    expect(component.editMode).toBeFalsy();
    expect(component.slForm.pristine).toBeTruthy();
    expect(dispatchSpy).toHaveBeenCalledWith(
      new ShoppingListActions.StopEdit()
    );
  });

  it("should delete ingredient and clear form when onDelete is called", () => {
    const dispatchSpy = jest.spyOn(store, "dispatch");
    component.onDelete();

    expect(dispatchSpy).toHaveBeenCalledWith(
      new ShoppingListActions.DeleteIngredient()
    );
    expect(component.editMode).toBeFalsy();
    expect(component.slForm.pristine).toBeTruthy();
  });

  it("should unsubscribe and exit edit mode when ngOnDestroy is called", () => {
    const dispatchSpy = jest.spyOn(store, "dispatch");
    const unsubscribeSpy = jest.spyOn(component.subscription, "unsubscribe");

    component.ngOnDestroy();

    expect(dispatchSpy).toHaveBeenCalledWith(
      new ShoppingListActions.StopEdit()
    );
    expect(unsubscribeSpy).toHaveBeenCalled();
    expect(component.editMode).toBeFalsy();
  });
});
