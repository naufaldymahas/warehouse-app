import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import axios from 'axios'
import FormInput from '../AddProduct/FormInput'
import FormSelect from '../AddProduct/FormSelect'

const EditHandler = ({fetchData,show, setShow, product, inputHandler, editHandler}) => {

    const [categories, setCategories] = useState();

    const [newCategory, setNewCategory] = useState('');

    const [loading, setLoading] = useState(false);

    const [photo, setPhoto] = useState({
        file: '',
        preview: product.photo
    });

    
    useEffect(() => {
        fetchCategories();
    }, []);
    
    const photoHandler = (value) => {
        setPhoto({...photo, file: value, preview: URL.createObjectURL(value)});
    };

    const fetchCategories = async () => {
        const res = await axios.get('http://localhost:8000/api/categories');
        setCategories(res.data);
    };

    const saveHandler = async () => {
        setLoading(true)
        const data = {
            productName: product.name,
            category: product.category !== 'Add new category' ? product.category : newCategory,
            price: product.price,
            weight: product.weight,
            stock: product.stock,
            photo: photo.file
        }
        const fd = new FormData()
        if (photo.file) fd.append('product', photo.file)
        fd.append('data', JSON.stringify(data))
        if (product.name && product.category && product.price && product.weight && product.stock) {
            if (product.category !== 'Add new category') {
                await axios.patch('http://localhost:8000/api/products/' + product.id, fd)
                setLoading(false)
                setShow(false)
                fetchData()
                alert('Data has been updated!')
            } else {
                await axios.patch('http://localhost:8000/api/productscategory/' + product.id, fd)
                setLoading(false)
                setShow(false)
                fetchData()
                alert('Data has been updated!')
            }
        }
    }

    if (!categories) return null
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormInput
                value={product.name}
                onChange={ e => inputHandler('name', e.target.value) }
                title='Product Name' placeholder='Lorem Ipsum...'/>
                <FormSelect
                newCategory={newCategory}
                setNewCategory={setNewCategory}
                categories={categories}
                value={product.category}
                placeholder='New Category...'
                onChange={ e => inputHandler('category', e.target.value) }
                title='Category'/>
                <FormInput
                value={product.price}
                onChange={ e => inputHandler('price', e.target.value.replace(/[^0-9]/g, '')) }
                title='Price' price/>
                <FormInput
                value={product.weight}
                onChange={ e => inputHandler('weight', e.target.value) }
                title='Weight' placeholder='1Kg'/>
                <FormInput
                value={product.stock}
                onChange={ e => inputHandler('stock', e.target.value.replace(/[^0-9]/g, '')) }
                title='Stock'/>
                <FormInput onChange={ e => photoHandler(e.target.files[0]) } title='Photo' type='file'/>
                {
                    photo.preview ?
                    photo.preview.includes('http://localhost:3000') ? 
                        (
                            <img src={photo.preview} alt="product" className='col-12'/>
                        )
                        :
                        (
                            <img src={'http://localhost:8000/products/' + photo.preview} alt="product" className='col-12'/>
                        )
                    :
                    null
                }
                <div className='mt-4'>
                    <button onClick={editHandler} className='btn btn-outline-info mr-3'>Cancel</button>
                    <button onClick={!loading ? saveHandler : null} className='btn btn-info'>
                        {
                            !loading ? (
                                'Save'
                            ) :
                            (
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            )
                        }
                    </button>
                </div>
                </Modal.Body>
        </Modal>
    )
}

export default EditHandler
