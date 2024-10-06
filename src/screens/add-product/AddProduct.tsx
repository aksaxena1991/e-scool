import React, { useCallback, useState } from 'react'
import Button from '../../components/button'
import { BUTTON_TYPES } from '../../components/button/data/button'
import Modal from '../../components/modal';
import AddProductForm from './product-form/AddProductForm'

const AddProduct = () => {

    const [showModal, setShowModal] = useState<boolean>(false);
    return (
        <>
        <div className="row d-flex align-items-center justify-content-around">
        <div className="col-6"><h4>Products</h4></div>
        <div className="col-6 d-flex justify-content-around"><Button onClick={()=>setShowModal(true)} type={BUTTON_TYPES.PRIMARY} btnText="Add Products" /></div>
        </div>

        <Modal isOpen={showModal}>
            <AddProductForm onclose={()=>setShowModal(false)}/>
        </Modal>

        </>
    )
}

export default AddProduct