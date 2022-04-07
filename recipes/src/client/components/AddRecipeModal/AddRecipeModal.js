import React, { useEffect, useState } from 'react';
import TagsInput from '../TagsInput/TagsInput';
import './AddRecipeModal.scss'

const AddRecipeModal = React.forwardRef(function AddRecipeModal(props, recipeRef) {

    const {data, open, dataToUpdate, isEdit, setIsEdit} = props
    const [recName, setRecName] = useState('')
    const [recTitle, setRecTitle] = useState('')
    const [recTags, setRecTags] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [tags, setTags] = useState([])

    useEffect(() => {
        if(isEdit) {
            setRecTitle(dataToUpdate.title)
            setRecName(dataToUpdate.name)
            setIngredients(dataToUpdate.ingredients)
            const tags = dataToUpdate.tags && dataToUpdate.tags.split(',') || []
            setTags(tags)
        }
    }, [isEdit, dataToUpdate])

    const onModalCancel = e => {
        recipeRef.current.style.display = 'none';
        setRecTitle('')
        setIngredients('')
    }
    const handleChangeName = e => {
        const targetVal = e.target.value
        setIngredients(targetVal)
    }

    const handleChange = e => {
        setRecName(e.target.value)
    }

    const handleChangeTitle = e => {
        setRecTitle(e.target.value)
    }
    const addIngredientsToStore = async () => {
        if(isEdit) {
            fetch(`/updateRecipe`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        title: recTitle, ingredients: ingredients, tags: recTags, name: recName
                    })
                }).then(res => res.json())
                .then(res => console.log(res))
        } else {
            fetch('/saverecipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title: recTitle, name: recName, tags: recTags, ingredients: ingredients, username: 'Siddhi'})
                }).then(res => res.json())
                .then(res => console.log(res));
        }
    }


    function handleKeyDown(e){
        if(e.key !== 'Enter') return
        const value = e.target.value
        if(!value.trim()) return
        setTags([...tags, value])
        const tagsString = tags.join(',')
        setRecTags(tagsString)
        e.target.value = ''
    }

    function removeTag(index){
        setTags(tags.filter((el, i) => i !== index))
    }

    return (
        <div id='newRecipe' ref={recipeRef} className='modal'>
            <div className='modal-content'>
            <span onClick={onModalCancel} className='close'>&times;</span>
            <form id='ingredient-form'>
                <div className='formContainer'>
                    <div className='content'>
                        <label htmlFor='name'>Name:</label>
                        <input onChange={handleChangeTitle} type='text' step='any' value={recTitle} required placeholder='Enter title of recipe' />
                    </div>
                    <div className='content'>
                        <label htmlFor='name'>Name:</label>
                        <input onChange={handleChange} type='text' step='any' value={recName} required placeholder='Enter name of recipe' disabled={isEdit}/>
                    </div>
                    <div className='content'>
                        <label htmlFor='ingredient'>Ingredient:</label>
                        <textarea rows="4" cols="50" onChange={handleChangeName} type='text' value={ingredients} required placeholder='Enter ingredients'/>
                    </div>
                    <div className="tags-input-container">
                        { tags.map((tag, index) => (
                            <div className="tag-item" key={index}>
                                <span className="text">{tag}</span>
                                <span className="close" onClick={() => removeTag(index)}>&times;</span>
                            </div>
                        )) }
                        <input rows="4" cols="50" onKeyDown={handleKeyDown} type='text' placeholder='Enter Tags' onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}/>
                    </div>
                    <button onClick={addIngredientsToStore} className='save-button'>
                        Add
                    </button>
                </div>
            </form>
            </div>
        </div>
    )
});

export default AddRecipeModal;