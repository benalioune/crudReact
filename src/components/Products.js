import React, { useState, useEffect, useContext } from 'react'
import Container from 'react-bootstrap/Container';
import axios from 'axios';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import { deleteProduct, getProducts, checkProduct, AppContext } from '../app/app';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';

function Products() {


    const [productState, setProductState] = useContext(AppContext);

    const [query, setQuery] = useState("");

    const navigate = useNavigate(); // hooks permettant de naviguer vers une autre route  en accedant a une foncton  

    useEffect(() => {
        handleGetProducts(productState.keyword, productState.currentPage, productState.pageSize); // une fois que le rendu de la page est generer handleGetProducts est appelé 
    }, []);





    const handleGetProducts = (keyword, page, size) => { // handleGetProducts envoie une requettes pour recuperer les produits depuis json-server
        getProducts(keyword, page, size).then(res => {
            const totalElements = res.headers['x-total-count'];
            let pagesCount = Math.floor(totalElements / size);
            if (totalElements % size != 0) ++pagesCount;
            console.log(pagesCount);

            setProductState({ ...productState, products: res.data, keyword: keyword, currentPage: page, pageSize: size, totalPages: pagesCount });
        }).catch((err) => {
            console.log('error', err);
        })
    }




    const handleDeleteProduct = (product) => {
        deleteProduct(product).then(res => {
            const newProducts = productState.products.filter((p) => p.id != product.id);
            setProductState({ ...productState, products: newProducts });

        }).catch((err) => {
            alert("Error deleting the Product");
        });

    };


    const handleGotoPage = (page) => { // function poour acceder a la page suivante depuis notre pagination

        handleGetProducts(productState.keyword, page, productState.pageSize); // get produits avec en params la page

    }


    const handleCheckProduct = (product) => {

        checkProduct(product).then(resp => {

            const newProducts = productState.products.map(p => {
                if (p.id == product.id) {
                    p.checked = !p.checked;
                }

                return p;
            });
            setProductState({ ...productState, products: newProducts });

        })

    };


    const handleSearch = (event) => {
        event.preventDefault();
        handleGetProducts(query, 1, productState.pageSize)
    }


    return (

        <div>

            <Navbar className="bg-body-tertiary m-5" >
                <Container>
                    <Navbar.Brand href="#home">Products Components</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Cart></Cart>
                        </Navbar.Text>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-center">
                        <Navbar.Text>
                            Signed in as: <a href="#login">Mark Otto</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div>

                <div className='d-flex align-items-center justify-content-center m-3'>


                    <form onSubmit={handleSearch}>

                        <div className='row  g-2'>
                            <div className='col-auto '>
                                <input onChange={(e) => setQuery(e.target.value)} value={query} className='form-control'></input>
                            </div>
                            <div className='col-auto'>
                                <button className='btn btn-success'>
                                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                                </button>
                            </div>

                        </div>


                    </form>

                </div>

                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Checked</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            productState.products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <button onClick={() => handleCheckProduct(product)} className='btn btn-outline-primary'>
                                            <FontAwesomeIcon icon={product.checked ? faCheckCircle : faCircle}></FontAwesomeIcon>
                                        </button>
                                    </td>
                                    <td onClick={() => handleDeleteProduct(product)} className='btn btn-outline-danger'>
                                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>

                                    </td>
                                    <td>
                                        <button onClick={() => navigate(`/EditProducts/${product.id}`)} className='btn btn-outline-success'>
                                            <FontAwesomeIcon icon={faEdit} color="green"></FontAwesomeIcon>
                                        </button>
                                    </td>
                                </tr>


                            ))
                        }
                    </tbody>

                </Table>

                <ul className='nav nav-pills'>

                    {
                        (new Array(productState.totalPages).fill(0)).map((v, index) => ( // creer un tableau avec un taille de la total des pages de notre states
                            <li key={index}>
                                <button onClick={() => handleGotoPage(index + 1)} className={(index + 1) == productState.currentPage ? 'btn btn-info ms-1' : 'btn btn-outline-info ms-1'}> {index + 1}</button>
                            </li>
                        ))
                    }

                </ul>


            </div>



        </div>




    )
}

export default Products