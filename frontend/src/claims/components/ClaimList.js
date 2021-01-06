import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadClaimsRequest, verifyClaimRequest } from '../thunks';
import { getUnverifiedClaims, getVerifiedClaims, getClaims } from '../selectors';
import { confirmClaim, } from '../actions';
import Claim from './Claim';
import './ClaimList.css';

const ClaimList = ({ verifiedClaims, unverifiedClaims, startLoadingClaims, onConfirmToggled, onVerifyPressed }) => {
    useEffect(() => {
        startLoadingClaims();
    }, []);

    const loadingMessage = <div>Loading claims...</div>
    const unverifiedClaimsContent = (unverifiedClaims.length > 0 ? unverifiedClaims.map(claim => {
        if (!claim.isVerified) {
            return <Claim claim={claim} onConfirmToggled={onConfirmToggled} onVerifyPressed={onVerifyPressed} />
        }
    })
        :
        <div>You currently do not have claims.</div>
    );

    const verifiedClaimsContent = (verifiedClaims.length > 0 ? verifiedClaims.map(claim => {
        if (claim.isVerified) {
            return <Claim claim={claim} />
        }
    })
        :
        <div>No claims found in recent history.</div>
    );

    const listContent = (
        <div className="list">
            <h4>Current Claims</h4>
            <ul id="cells">
                {unverifiedClaimsContent}
            </ul>
            <h4>Claim History</h4>
            <ul id="cells">
                {verifiedClaimsContent}
            </ul>
        </div>
    )
    return listContent;
}

const mapStateToProps = state => ({
    claims: getClaims(state),
    verifiedClaims: getVerifiedClaims(state),
    unverifiedClaims: getUnverifiedClaims(state),
})

const mapDispatchToProps = dispatch => ({
    startLoadingClaims: () => dispatch(loadClaimsRequest()),
    onVerifyPressed: claim => dispatch(verifyClaimRequest(claim)),
    onConfirmToggled: claim => dispatch(confirmClaim(claim)), // server request to confirm a claim is not needed
})

export default connect(mapStateToProps, mapDispatchToProps)(ClaimList);