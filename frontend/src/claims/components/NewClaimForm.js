import React, { useState } from 'react';
import { connect } from 'react-redux';
import { } from '../selectors';
import { addClaimRequest } from '../thunks';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

const NewClaimForm = ({ createClaim }) => {
    const [inputName, setInputName] = useState('');
    const [inputAmount, setInputAmount] = useState('');
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return <div>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Provide Service</ModalHeader>
            <ModalBody>
                Please enter the name.
            <Input onChange={e => setInputName(e.target.value)} placeholder="Name" value={inputName} />
            </ModalBody>
            <ModalFooter>
                <Input onChange={e => setInputAmount(e.target.value)} placeholder="Amount" value={inputAmount} />
                <Button color="success" onClick={() => {
                    createClaim(inputName, inputAmount);
                    setInputName('');
                    setInputAmount('');
                    setModal(false);
                }
                }>Create</Button>{' '}
                <Button color="danger" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
        <div style={{"textAlign": "center"}}>
            <Button color="info" style={{"margin": "5px"}}onClick={toggle}>Create New Claim</Button>
        </div>
    </div>
};

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    createClaim: (name, amount) => dispatch(addClaimRequest(name, amount))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewClaimForm);