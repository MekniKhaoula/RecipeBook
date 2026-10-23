package recipebook_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import recipebook_backend.entity.Recipe;
import recipebook_backend.repository.RecipeRepository;

@Service
public class RecipeService {

	private final RecipeRepository recipeRepository;

    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Optional<Recipe> getRecipeById(Long id) {
        return recipeRepository.findById(id);
    }

    public Recipe createRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public Optional<Recipe> updateRecipe(Long id, Recipe updatedRecipe) {
        return recipeRepository.findById(id).map(recipe -> {
            recipe.setTitle(updatedRecipe.getTitle());
            recipe.setDescription(updatedRecipe.getDescription());
            recipe.setIngredients(updatedRecipe.getIngredients());
            recipe.setPreparationTime(updatedRecipe.getPreparationTime());
            recipe.setCookingTime(updatedRecipe.getCookingTime());

            return recipeRepository.save(recipe);
        });
    }

    public boolean deleteRecipe(Long id) {
        if (!recipeRepository.existsById(id)) {
            return false;
        }

        recipeRepository.deleteById(id);
        return true;
    }
}
