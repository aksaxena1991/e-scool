import React, { useCallback, useState } from 'react';
import Button from '../../components/button';
import {BUTTON_TYPES} from '../../components/button/data/button';
import Input from '../../components/input';
import Spacer from '../../components/spacer/Spacer';
import Modal from '../../components/modal';
import SubCategoryTable from "./subCategory-table/SubCategoryTable";
import AddSubCategoryFrom from './subCategory-form/AddSubCategoryForm';

const SubCategories: React.FC = () => {

    const [showModal, setShowModal] = useState<boolean>(false);

    return (
      <>
        <div className="row d-flex align-items-center justify-content-around">
          <div className="col-6">
            <h4>Sub Categories</h4>
          </div>
          <div className="col-6 d-flex justify-content-around">
            <Button
              onClick={() => setShowModal(true)}
              type={BUTTON_TYPES.PRIMARY}
              btnText="Add Sub Category"
            />
          </div>
        </div>

        <Modal isOpen={showModal}>
        <AddSubCategoryFrom  onclose={() => {
          setShowModal(false);
        }}/>
      </Modal>

        <Spacer height="16px" />
        <SubCategoryTable />
      </>
    );
  };

export default SubCategories