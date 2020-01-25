import React from 'react'

const FormInput = ({ title, placeholder, price, type, value, onChange }) => {
    return (
        <div className='form-group col-5' style={{ display: 'grid' }}>
            <label htmlFor={title}>{title}</label>
            {
                price ? 
                (
                    <div style={{ position: 'relative' }}>
                        <span className='text-muted' style={{ position: 'absolute', zIndex: 10, padding: '3px', paddingLeft: 6 }}>Rp. </span>
                        <input
                            value={value}
                            onChange={onChange}
                            placeholder={placeholder ? placeholder : null}
                            id={title}
                            style={{ paddingLeft: 30 }}
                            className='w-100'
                        />
                    </div>
                ) :
                <input 
                    value={value}
                    onChange={onChange}
                    type={type === 'file' ? type : 'text'}
                    placeholder={placeholder ? placeholder : null}
                    id={title}
                />
            }
        </div>
    )
}

export default FormInput
