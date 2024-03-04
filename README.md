# Recipe Management System README

## Welcome to our Recipe Management System!

Welcome to our Recipe Management System! This system makes it easy for you to organize and access your favorite recipes. You can add, edit, delete, and favorite recipes hassle-free.

### Features

#### Search Functionality
When you visit our website, you'll see a search bar. If you haven't added any recipes yet, it'll let you know. Once you've added recipes, you can use the search bar to find recipes by their titles or ingredients. Just type in what you're looking for, and the system will show you matching recipes in real-time.

#### Recipe Actions
Each recipe has two buttons:

- **View Button**: Takes you to a detailed page for that recipe.
- **Actions Button**: Offers various options:
  - Edit: Modify the recipe details, ingredients, or instructions.
  - Delete: Remove the recipe from the system.
  - Add to Favorites: Save the recipe to your favorites list.

#### Favorites Management
You can access your favorite recipes by clicking on "Favorites." Here, you'll see all your favorite recipes and can easily remove them from the list. If you delete a recipe from the system, it's automatically removed from your favorites too.

#### Setup
1. Clone the repository.
2. Navigate to the Recipes folder.
3. Run `npm install`.
4. If you don't have it already, install json-server globally: `npm install -g json-server`.
5. Go to the src/json-server folder and run `json-server --watch recipes.json`.
6. Run `ng serve -o` to start the server and open the system in your browser.
