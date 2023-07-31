import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { getProductById, saveProduct, updateProduct } from '../app/app';
import { useParams } from 'react-router-dom';



function CheckExempleForm() {
    return (

        <Form>
            {['checkbox', 'radio'].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                    <Form.Check // prettier-ignore
                        type={type}
                        id={`default-${type}`}
                        label={`default ${type}`}
                    />
                </div>
            ))}
        </Form>
    );




}


function EditProducts() {

    const { id } = useParams();  // pour recuperer le id de llmts a modifier 

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [checked, setChecked] = useState(false);

    /*

    une fois que l'id de llmts a modifier est recuperer grace a useParams,
    on envoie la requette a notre banckend puis on recupere le produit pour l'afficher a notre formulaire

    on utilise useEffect() qui sexecute une fois que le rendu sera generer pour initialiser notre formulaire

    */

    useEffect(() => {
        handleGetProductById(id)

    }, []);

    const handleGetProductById = (id) => {
        getProductById(id).then(res => {
            let product = res.data;
            setName(product.name);
            setPrice(product.price);
            setChecked(product.checked);
        })
    }



    const handleUpdateProduct = (event) => {

        event.preventDefault(); // bloque le raffraichissement de la page apres submit
        let product = { id, name, price, checked };
        updateProduct(product).then((res) => {
            alert(JSON.stringify(res.data));
        }).catch((err) => {
            alert(`Error: ${err}`);
        })
    }


    return (

        <div className='mb-3 p-5'>
            <div className='card col-6 offset-3 p-2'>
                <div className='card'>
                    <div className='card-body '>

                        <form onSubmit={handleUpdateProduct} className=''>
                            {id}

                            <div className='mb-3'>
                                <label className='form-label'> Name:</label>
                                <input type="text" className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className='mb-3'>
                                <label className='form-label'> Price:</label>
                                <input type="text" className='form-control' value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>

                            <div className='form-check'>
                                <label className='form-label'> Checked</label>
                                <input type="checkbox" className='form-check-input' checked={checked} onChange={(e) => setChecked(e.target.value)} />
                            </div>

                            <button className='btn btn-success mb-3 p-2'>Save</button>


                        </form>



                    </div>

                </div>

            </div>

        </div>
    )
}

export default EditProducts