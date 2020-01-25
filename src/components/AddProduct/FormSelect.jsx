import React from 'react'

const FormSelect = ({ title, value, onChange, categories, placeholder, newCategory, setNewCategory }) => {

    let options = []
    categories.map(category => options.push(category))
    options.push('Add new category')

    return (
        <div className='form-group col-5' style={{ display: 'grid' }}>
            <label htmlFor={title}>{title}</label>
            <select value={value} onChange={onChange} className='custom-select pl-2' id={title}>
                <option value=''>Select Category</option>
                {
                    options.map((option, index) => 
                        (
                            option.id ? (
                                <option key={index} value={option.id}>{option.category}</option>
                            )
                            : (
                                <option key={index} value={option}>{option}</option>
                            )

                        )
                    )
                }
            </select>
            {
                value === 'Add new category' ?
                (
                    <input className='mt-3' placeholder={placeholder} value={newCategory} onChange={ e => setNewCategory(e.target.value) }/>
                ) :
                null
            }
        </div>
    )
}

export default FormSelect
