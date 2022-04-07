import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const Recipe = ({ recipes, completeRecipe, removeRecipe, updateRecipe }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateRecipe(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return recipes.map((recipe, index) => (
    <div
      className={recipe.isComplete ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div key={recipe.id} onClick={() => completeRecipe(recipe.id)}>
        {recipe.text}
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeRecipe(recipe.id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({ id: recipe.id, value: recipe.text })}
          className='edit-icon'
        />
      </div>
    </div>
  ));
};

export default Recipe;

