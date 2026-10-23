package recipebook_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import recipebook_backend.entity.Recipe;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

}
