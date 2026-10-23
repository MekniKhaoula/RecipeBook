package recipebook_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import recipebook_backend.entity.Recipe;
import recipebook_backend.service.RecipeService;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "http://localhost:4200")
public class RecipeController {
	
	    private final RecipeService recipeService;

	    public RecipeController(RecipeService recipeService) {
	        this.recipeService = recipeService;
	    }

	    // Get all recipes
	    @GetMapping
	    public List<Recipe> getAllRecipes() {
	        return recipeService.getAllRecipes();
	    }

	    // Get a recipe by ID
	    @GetMapping("/{id}")
	    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {
	        return recipeService.getRecipeById(id)
	                .map(ResponseEntity::ok)
	                .orElseGet(() -> ResponseEntity.notFound().build());
	    }

	    // Create a recipe
	    @PostMapping
	    public ResponseEntity<Recipe> createRecipe(@RequestBody Recipe recipe) {
	        Recipe createdRecipe = recipeService.createRecipe(recipe);
	        return ResponseEntity.status(HttpStatus.CREATED).body(createdRecipe);
	    }

	    // Update a recipe
	    @PutMapping("/{id}")
	    public ResponseEntity<Recipe> updateRecipe(
	            @PathVariable Long id,
	            @RequestBody Recipe recipe) {

	        return recipeService.updateRecipe(id, recipe)
	                .map(ResponseEntity::ok)
	                .orElseGet(() -> ResponseEntity.notFound().build());
	    }

	    // Delete a recipe
	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id) {
	        if (recipeService.deleteRecipe(id)) {
	            return ResponseEntity.noContent().build();
	        }
	        return ResponseEntity.notFound().build();
	    }

}
