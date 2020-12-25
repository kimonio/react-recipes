import React, { useContext } from 'react'
import RecipeIngredientEdit from './RecipeIngredientEdit'
import { RecipeContext } from './App'
import { v4 as uuidv4 } from 'uuid'

export default function RecipeEdit({ recipe }) {
	const { handleRecipeSelect, handleRecipeChange } = useContext(RecipeContext)

	function handleChange(changes) {
		handleRecipeChange(recipe.id, { ...recipe, ...changes })
	}

	function handleIngredientChange(id, ingredient) {
		const newIngredients = [...recipe.ingredients]
		const index = newIngredients.findIndex((i) => i.id === id)
		newIngredients[index] = ingredient
		handleChange({ ingredients: newIngredients })
	}

	function handleIngredientAdd() {
		const newIngredient = {
			id: uuidv4(),
			name: '',
			amount: '',
		}
		const newIngredients = [...recipe.ingredients]
		newIngredients.push(newIngredient)
		handleChange({ ingredients: newIngredients })
	}

	function handleIngredientDelete(id) {
		const newIngredients = [...recipe.ingredients]
		handleChange({ ingredients: newIngredients.filter((i) => i.id !== id) })
	}

	return (
		<div className='recipe-edit'>
			<div className='recipe-edit__remove-button-container'>
				<button
					className='btn recipe-edit__remove-button'
					onClick={() => handleRecipeSelect()}>
					&times;
				</button>
			</div>
			<div className='recipe-edit__details-grid'>
				<label htmlFor='name' className='recipe-edit__label'>
					Name
				</label>
				<input
					type='text'
					name='name'
					id='name'
					value={recipe.name}
					onChange={(event) => handleChange({ name: event.target.value })}
					className='recipe-edit__input'
				/>
				<label htmlFor='cookTime' className='recipe-edit__label'>
					Cook Time
				</label>
				<input
					type='text'
					name='cookTime'
					id='cookTime'
					value={recipe.cookTime}
					onChange={(event) => handleChange({ cookTime: event.target.value })}
					className='recipe-edit__input'
				/>
				<label htmlFor='servings' className='recipe-edit__label'>
					Servings
				</label>
				<input
					type='number'
					min='1'
					name='servings'
					id='servings'
					value={recipe.servings}
					onChange={(event) =>
						handleChange({ servings: parseInt(event.target.value) || '' })
					}
					className='recipe-edit__input'
				/>
				<label htmlFor='instructions' className='recipe-edit__label'>
					Instructions
				</label>
				<textarea
					name='instructions'
					className='recipe-edit__input'
					value={recipe.instructions}
					onChange={(event) =>
						handleChange({ instructions: event.target.value })
					}
					id='instructions'
				/>
			</div>
			<br />
			<label className='recipe-edit__label'>Ingredients</label>
			<div className='recipe-edit__ingredient-grid'>
				<div>Name</div>
				<div>Amount</div>
				<div></div>
				{recipe.ingredients.map((ingredient) => (
					<RecipeIngredientEdit
						handleIngredientChange={handleIngredientChange}
						handleIngredientDelete={handleIngredientDelete}
						key={ingredient.id}
						ingredient={ingredient}
					/>
				))}
			</div>
			<div className='recipe-edit__add-ingredient-btn-container'>
				<button className='btn btn--primary' onClick={handleIngredientAdd}>
					Add Ingredient
				</button>
			</div>
		</div>
	)
}
