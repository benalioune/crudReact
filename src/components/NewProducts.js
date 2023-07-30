import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { saveProduct } from '../app/app';



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


function NewProducts() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [checked, setChecked] = useState(false);


    const handleSaveProduct = (event) => {

        event.preventDefault(); // bloque le raffraichissement de la page apres submit
        let product = { name, price, checked };
        saveProduct(product).then((res) => {
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

                        <form onSubmit={handleSaveProduct} className=''>

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

export default NewProducts