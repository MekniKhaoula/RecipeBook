
import { Component, Output, EventEmitter, Input  } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RecipeService } from '../../services/recipe';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe';

@Component({ 
  selector: 'app-recipe-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.css',
})
export class RecipeForm {
  recipeForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  @Output() recipeAdded = new EventEmitter<void>();
  @Input() recipeToEdit: Recipe | null = null;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService
  ) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: ['', Validators.required],
      preparationTime: [0, [Validators.required, Validators.min(0)]],
      cookingTime: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched();
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';

    this.recipeService.createRecipe(this.recipeForm.value).subscribe({
      next: () => {
        this.successMessage = 'Recette ajoutée avec succès !';
      
        this.recipeForm.reset({
          title: '',
          description: '',
          ingredients: '',
          preparationTime: 0,
          cookingTime: 0
        });
      
        this.recipeAdded.emit();
      },
      error: (error) => {
        console.error('Erreur lors de l’ajout de la recette :', error);
        this.errorMessage = 'Impossible d’ajouter la recette. Vérifie que le backend est démarré.';
      }
    });
  }
}
