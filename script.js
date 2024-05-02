const searchBox = document.querySelector('.searchBox');
const srchbtn = document.querySelector('.searchbtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDtlsContent = document.querySelector('.recipeDetailsContent');
const closeBtn = document.querySelector('.recipeCloseBtn');

const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "Fetching Recipes...."

    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();

        recipeContainer.innerHTML = ""
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `<img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `;

            const button = document.createElement('button');
            button.classList.add('viewbtn');
            button.innerHTML = 'View Recipe';
            recipeDiv.appendChild(button);

            // Adding Event listener to the button
            button.addEventListener('click', () => {
                openRecipePopup(meal);

            });

            recipeContainer.appendChild(recipeDiv);
        });
    }
    catch (error) {
        recipeContainer.innerHTML = `<h2>Error in Fetching Recipes....</h2>`
    }
}

const fetchIngredients = (meal) => {
    let ingredients = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredients += `<li>${measure} ${ingredient}</li>`
        } else {
            break;
        }
    }
    return ingredients;
    console.log(meal);
}

const openRecipePopup = (meal) => {
    recipeDtlsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div class="recipeInstruction">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    
    `
    recipeDtlsContent.parentElement.style.display = 'block';
}

closeBtn.addEventListener('click', () => {
    recipeDtlsContent.parentElement.style.display = 'none';
})

srchbtn.addEventListener('click', (e) => {
    e.preventDefault();
    const srchValue = searchBox.value.trim();
    if (!srchValue) {
        recipeContainer.innerHTML = `<h2>Type the meal in the search box.</h2>`;
        return;
    }
    fetchRecipes(srchValue);
    console.log(srchValue);
})
