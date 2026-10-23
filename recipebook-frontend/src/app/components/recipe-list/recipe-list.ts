
import { Component, OnInit } from '@angular/core';
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

  constructor(private recipeService: RecipeService) {}


  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe({
      next: (data: Recipe[]) => {
        console.log('Recettes reçues par Angular :', data);
        this.recipes = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des recettes', error);
        this.errorMessage = 'Impossible de charger les recettes.';
      }
    });
  }
  
}
