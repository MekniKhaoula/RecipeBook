import { Component, signal , ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipeList } from './components/recipe-list/recipe-list';
import { RecipeForm } from './components/recipe-form/recipe-form';

@Component({
  imports: [RecipeList, RecipeForm],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App {
  protected readonly title = signal('recipebook-frontend');
  @ViewChild(RecipeList) recipeList!: RecipeList;

  onRecipeAdded(): void {
    this.recipeList.loadRecipes();
  }
}
