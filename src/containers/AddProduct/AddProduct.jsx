import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FormInput from '../../components/AddProduct/FormInput'
import FormSelect from '../../components/AddProduct/FormSelect'

const AddProduct = () => {

    const [categories, setCategories] = useState();

    const [input, setInput] = useState({
        productName: '',
        category: '',
        price: '',
        weight: '',
        stock: '',
    });

    const [newCategory, setNewCategory] = useState('')

    const [photo, setPhoto] = useState({
        file: '',
        preview: ''
    });

    const [loading, setLoading] = useState(false);

    const [err, setErr] = useState();

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        const res = await axios.get('http://localhost:8000/api/categories')
        setCategories(res.data)
    }

    const inputHandler = (type, value) => {
        setInput({...input, [type]: value});
    };

    const photoHandler = (value) => {
        setPhoto({...photo, file: value, preview: URL.createObjectURL(value)});
    };

    const {
        productName,
        category,
        price,
        weight,
        stock
    } = input;

    const uploadHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        const data = {
            productName,
            category: category !== 'Add new category' ? category : newCategory,
            price,
            weight,
            stock,
            photo: photo.file
        }
        const fd = new FormData()
        fd.append('product', photo.file)
        fd.append('data', JSON.stringify(data))
        if (productName && category && price && weight && stock && photo.file) {
            if (category !== 'Add new category') {
                await axios.post('http://localhost:8000/api/products', fd)
                fetchCategories()
                setInput({
                    productName: '',
                    category: '',
                    price: '',
                    weight: '',
                    stock: '',
                })
                setPhoto({
                    file: '',
                    preview: ''
                })
                alert('Data added!')
            } else {
                if (checkCategories()) {
                    await axios.post('http://localhost:8000/api/productscategory', fd)
                    fetchCategories()
                    setInput({
                        productName: '',
                        category: '',
                        price: '',
                        weight: '',
                        stock: '',
                    })
                    setPhoto({
                        file: '',
                        preview: ''
                    })
                    alert('Data added!')
                } else {
                    setErr('Category already exist!')
                }
            }
        } else setErr('Fill the form')
        setLoading(false)
    };

    const checkCategories = () => {
        let check = true
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].category.toLowerCase() === newCategory.toLowerCase()) check = false
        }
        return check
    }

    if (!categories) return (
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    )
    return (
        <>
            <h5>Add Product</h5>
            <form id='add' onSubmit={uploadHandler}>
            <FormInput value={productName} onChange={ e => inputHandler('productName', e.target.value) } title='Product Name' placeholder='Lorem Ipsum...'/>
            <FormSelect
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            categories={categories}
            value={category}
            onChange={ e => inputHandler('category', e.target.value) }
            placeholder='New Category...'
            title='Category'/>
            <FormInput value={price} onChange={ e => inputHandler('price', e.target.value.replace(/[^0-9]/g, '')) } title='Price' price/>
            <FormInput value={weight} onChange={ e => inputHandler('weight', e.target.value) } title='Weight' placeholder='1Kg'/>
            <FormInput value={stock} onChange={ e => inputHandler('stock', e.target.value.replace(/[^0-9]/g, '')) } title='Stock'/>
            <FormInput onChange={ e => photoHandler(e.target.files[0]) } title='Photo' type='file'/>
            {
                photo.preview ? 
                (
                    <img src={photo.preview} alt='product'/>
                )
                :
                null
            }
            </form>

            <button onClick={ !loading ? uploadHandler : null } form='add' type='submit' className='btn btn-info'>
                {
                    !loading ? (
                        'Add'
                    ) :
                    (
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    )
                }
            </button>
            {
                !err ? null : (
                    <div className="alert alert-danger mt-3 col-4 text-center" role="alert">
                        {err}
                    </div>
                )
            }
        </>
    )
}

export default AddProduct
