// @flow

import React, { useEffect } from 'react';
import { Button, CardHeader, Card, Input, CardTitle, CardText, CardGroup, CardBody, Col, Row } from 'reactstrap';
import './Claim.css'

const Claim = ({ claim, onConfirmToggled, onVerifyPressed }) => {
    const claimContent = (claim.isVerified ?
        <div>
            <h5 className="confirmation">Confirmation: {claim.isConfirmed ? 'Accepted' : 'Disputed'}</h5>
        </div>
        :
        null
    )
    return (
        <div className="claim">
            <CardGroup>
                <Card body outline color="primary">
                    <CardHeader>{claim.text}</CardHeader>
                    <CardBody>
                        <Row>
                            <Col>
                                {claim.isVerified ?
                                    <h5 className="status">Status: Claim verified</h5>
                                    :
                                    <h5 className="status">Status: Attention needed</h5>
                                }
                                <CardTitle>Claim ID: {claim.id}</CardTitle>
                                <CardTitle>Claim Amount: {claim.amount}</CardTitle>
                                <CardTitle>Claim Creation Date: {new Date(parseInt(claim.date, 10)).toString().split('-')[0]}</CardTitle>
                            </Col>
                            <Col>
                                <CardText>
                                    {claimContent}
                                </CardText>
                            </Col>
                        </Row>
                        {!claim.isVerified ?
                            <div className="options-container">
                                <Input className="textbox" type="textarea" placeholder="(Optional) Please give us feedback, concerns, or just anything you wish to say..." />
                                <div className="checkbox-confirm">
                                    <input className="checkbox" type="checkbox" checked={claim.isConfirmed} onChange={() => onConfirmToggled(claim)} />
                                    <label className="checkbox-label">By checking this box, I confirm that this claim is filed correctly.</label>
                                </div>
                                <button className="button-verify" onClick={() => onVerifyPressed(claim)}>Verify Claim</button>
                            </div>
                            :
                            null
                        }
                    </CardBody>
                </Card>
            </CardGroup>
        </div>
    )
}

export default Claim;