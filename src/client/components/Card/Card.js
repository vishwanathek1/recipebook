import './card.scss'
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { useRef, useState } from 'react';

function Card(props) {

  const {data, removeRecipe, editRecipe} = props
  const ingredients = data.ingredients.split(',')
  const tags = data.tags && data.tags.split(',') || []
  return <div className='cardIcons'><div className='card' key={data.name}>
    <div className="container">
      <h2><b>Title:</b></h2> 
      <h4>{data.title}</h4> 
      <h2><b>Name:</b></h2> 
      <h4>{data.name}</h4> 
      <h2><b>Ingredients:</b></h2> 
      {ingredients.map(ing => <h4>{ing}</h4> 
      )}
      <h2><b>Tags:</b></h2> 
      { tags.map((tag, index) => (
        <div className="tag-item" key={index}>
            <span className="text">{tag}</span>
        </div>
      ))}
    </div>
    </div>
    <div className='icons'>
        <RiCloseCircleLine
          onClick={e => removeRecipe(e, data.name)}
          className='delete-icon'
        />
        <TiEdit
          onClick={e => editRecipe(e, data.name)}
          className='edit-icon'
        />
    </div>
  </div>
}

export default Card;
