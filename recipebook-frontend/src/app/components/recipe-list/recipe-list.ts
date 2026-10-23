
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css'
})
export class RecipeList implements OnInit {

  recipes: Recipe[] = [];
  errorMessage = '';
  selectedRecipe: Recipe | null = null;

  constructor(
    private recipeService: RecipeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  // Load all recipes from the backend
  loadRecipes(): void {
    this.errorMessage = '';

    this.recipeService.getAllRecipes().subscribe({
      next: (data: Recipe[]) => {
        console.log('Recipes received by Angular:', data);
        this.recipes = data;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading recipes:', error);
        this.errorMessage = 'Unable to load recipes.';
        this.cdr.markForCheck();
      }
    });
  }

  // Select a recipe for editing
  editRecipe(recipe: Recipe): void {
    this.selectedRecipe = { ...recipe };
    console.log('Selected recipe for editing:', this.selectedRecipe);
  }

  // Handle text fields
  onTextInput(
    field: 'title' | 'description' | 'ingredients',
    event: Event
  ): void {
    if (this.selectedRecipe) {
      const value = (
        event.target as HTMLInputElement | HTMLTextAreaElement
      ).value;

      this.selectedRecipe[field] = value;
    }
  }

  // Handle numeric fields
  onNumberInput(
    field: 'preparationTime' | 'cookingTime',
    event: Event
  ): void {
    if (this.selectedRecipe) {
      const value = (event.target as HTMLInputElement).value;
      this.selectedRecipe[field] = Number(value);
    }
  }

  // Save recipe changes
  saveRecipe(): void {
    if (
      !this.selectedRecipe ||
      this.selectedRecipe.id === undefined
    ) {
      return;
    }

    this.errorMessage = '';

    this.recipeService
      .updateRecipe(this.selectedRecipe.id, this.selectedRecipe)
      .subscribe({
        next: () => {
          console.log('Recipe updated successfully.');
          this.selectedRecipe = null;
          this.loadRecipes();
        },
        error: (error) => {
          console.error('Error updating recipe:', error);
          this.errorMessage = 'Unable to update the recipe.';
          this.cdr.markForCheck();
        }
      });
  }

  // Cancel editing without saving
  cancelEdit(): void {
    this.selectedRecipe = null;
    this.errorMessage = '';
  }

  deleteRecipe(recipe: Recipe): void {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${recipe.title}"?`
    );
  
    if (!confirmed) {
      return;
    }
  
    if (recipe.id === undefined) {
      return;
    }
  
    this.errorMessage = '';
  
    this.recipeService.deleteRecipe(recipe.id).subscribe({
      next: () => {
        console.log('Recipe deleted successfully.');
        this.selectedRecipe = null;
        this.loadRecipes();
      },
      error: (error) => {
        console.error('Error deleting recipe:', error);
        this.errorMessage = 'Unable to delete the recipe.';
        this.cdr.markForCheck();
      }
    });
  }
}
