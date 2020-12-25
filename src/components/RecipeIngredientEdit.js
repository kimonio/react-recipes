import React from 'react'

export default function RecipeIngredientEdit(props) {
	const { ingredient, handleIngredientChange, handleIngredientDelete } = props
	const { id, name, amount } = ingredient

	function handleChange(changes) {
		handleIngredientChange(id, { ...ingredient, ...changes })
	}

	return (
		<>
			<input
				className='recipe-edit__input'
				value={name}
				onChange={(event) => handleChange({ name: event.target.value })}
				type='text'
			/>
			<input
				className='recipe-edit__input'
				value={amount}
				onChange={(event) => handleChange({ amount: event.target.value })}
				type='text'
			/>
			<button
				className='btn btn--danger'
				onClick={() => handleIngredientDelete(id)}>
				&times;
			</button>
		</>
	)
}
