import React from 'react'

const RenderList = ({product, index, editHandler, deleteHandler}) => {

    return (
        <tr key={index}>
            <td>{index+1}</td>
            <td>{product.name}</td>
            <td>{product.categoryName}</td>
            <td>{product.price}</td>
            <td>{product.weight}</td>
            <td>{product.stock}</td>
            <td>
                <button className='btn btn-link' onClick={ () => window.open('http://localhost:8000/products/' + product.photo)}>See Image</button>
            </td>
            <td>
                <button onClick={ () => editHandler('edit', product) } className='btn btn-warning'>Edit</button>
                <button onClick={ () => deleteHandler(product.id) } className='btn btn-danger ml-2'>Delete</button>
            </td>
        </tr>
    )
}

export default RenderList
