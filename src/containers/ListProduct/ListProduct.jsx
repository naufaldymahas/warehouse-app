import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RenderList from '../../components/ListProduct/RenderList'
import EditHandler from '../../components/ListProduct/EditHandler'

const ListProduct = () => {

    const [data, setData] = useState(null)
    const [edit, setEdit] = useState(null)
    const [show, setShow] = useState(null)

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        const res = await axios.get('http://localhost:8000/api/products')
        setData(res.data)
    };

    const editHandler = (type, product) => {
        if (type === 'edit') {
            setShow(true)
            setEdit(product)
        } else {
            setShow(false)
            setEdit(null)
        }
    };

    const inputHandler = (type, value) => {
        setEdit({...edit, [type]: value});
    };

    const deleteHandler = async (id) => {
        await axios.delete('http://localhost:8000/api/products/' + id);
        fetchData();
        alert('Data has been deleted!');
    };

    const renderList = () => {
        const products = data.map((product, index) => {
            return (
                <RenderList key={index} product={product} index={index} editHandler={editHandler} deleteHandler={deleteHandler}/>
            )
        })
        return products
    }

    console.log(data)

    if (!data) return (
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    )
    
    if (data.length === 0 ) return (
        <>
            <h5>List Products</h5>
            <p>No Data</p>
        </>
    )
    return (
        <>
            <h5>List Products</h5>
            <table className='table text-center'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Weight</th>
                        <th>Stock</th>
                        <th>Photo</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {renderList()}
                </tbody>
            </table>
            {
                edit ?
                <EditHandler fetchData={fetchData} product={edit} show={show} setShow={setShow} editHandler={editHandler} inputHandler={inputHandler}/>
                :
                null
            }
        </>
    )
}

export default ListProduct
