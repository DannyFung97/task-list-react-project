import React, { useState } from 'react';
import { connect } from 'react-redux';
import { } from '../selectors';
import { addTaskRequest, deleteHistoryRequest } from '../thunks';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Row, Col, FormGroup, FormText, FormFeedback } from 'reactstrap';
import './TaskOptions.css';

const TaskOptions = ({ createTask, deleteHistory }) => {
    const [inputName, setInputName] = useState('');
    const [inputDate, setInputDate] = useState('');
    const [modal, setModal] = useState(false);
    const [nameValid, setNameValid] = useState(false);
    const toggle = () => setModal(!modal);

    function createHandler(name, date){
        if(name !== ''){
            createTask(name, date);
            setInputName('');
            setInputDate('');
            setModal(false);
        }
        else{
            setNameValid(true);
        }
    }

    function setName(name){
        if(nameValid){
            setNameValid(false);
        }
        setInputName(name)
    }

    function adjustDateInput(dueDate) {
        let nowString = Date.now()
        let dueString = new Date(dueDate).getTime()
        let returnString = ''
        if (dueDate == '' || dueString < nowString) {
            let adjustedNow = new Date(nowString).setHours(23, 59, 59, 999);
            returnString = adjustedNow;
        }
        else {
            returnString = dueString;
        }
        return returnString
    }

    return <div>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Task</ModalHeader>
            <ModalBody>
                Enter the task's name and due date
                <Row form>
                    <Col md={5}>
                        <FormGroup>
                            <Input invalid={nameValid} onChange={e => setName(e.target.value)} placeholder="Name" value={inputName} />
                            <FormFeedback tooltip>Name cannot be empty.</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col md={5}>
                        <FormGroup>
                            <Input type='datetime-local' onChange={e => setInputDate(e.target.value)} placeholder="Due Date" value={inputDate} />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <Button color="info" onClick={() => {
                            createHandler(inputName, adjustDateInput(inputDate));
                        }
                        }>Create</Button>{' '}
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <FormText>Note: A task created without an assigned due date is due by the end of today.</FormText>
            </ModalFooter>
        </Modal>
        <div style={{ "textAlign": "center" }}>
            <Button className='task-button' color="info" onClick={toggle}>Create New Task</Button>
            <Button className='task-button' color="danger" onClick={() => { deleteHistory() }}>Delete History</Button>
        </div>
    </div>
};

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    createTask: (name, date) => dispatch(addTaskRequest(name, date)),
    deleteHistory: () => dispatch(deleteHistoryRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskOptions);