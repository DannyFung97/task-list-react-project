import {
    loadClaims,
    verifyClaim,
    addClaim,
} from './actions';

export const loadClaimsRequest = () => async (dispatch, getState) => {
    try {
        const response = await fetch('http://localhost:8080/claims');
        const claims = await response.json();

        dispatch(loadClaims(claims));
    }
    catch(e){
        dispatch(displayAlert(e));
    }
}

export const verifyClaimRequest = claimToVerify => async dispatch => {
    try {
        const response = await fetch(`http://localhost:8080/verify-claim`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                claim: claimToVerify
            })
        });
        const claim = await response.json();
        if(claim.message === 'Success'){
            dispatch(verifyClaim(claim.updatedClaim));
        }
        else{
            dispatch(displayAlert(claim.message));
        }
    }
    catch(e) {
        dispatch(displayAlert(e));
    }
}

export const addClaimRequest = (cName, cAmount) => async dispatch => {
    try {
        const response = await fetch(`http://localhost:8080/create-claim`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                name: cName,
                amount: cAmount,
            })
        });
        const claim = await response.json();
        if(claim.message === 'Success'){
            dispatch(addClaim(claim.newClaim));
        }
        else{
            dispatch(displayAlert(claim.message));
        }
    }
    catch(e){
        dispatch(displayAlert(e));
    }
}

// export const confirmClaimRequest = id => async dispatch => {
//     try {
//         const response = await fetch(`http://localhost:8080/claims/${id}/confirm`, {
//             method: 'post'
//         });
//         const claim = await response.json();
//         if(claim.message === 'Success'){
//             dispatch(confirmClaim(claim.updatedClaim));
//         }
//         else{
//             dispatch(displayAlert(claim.message));
//         }
//     }
//     catch(e) {
//         dispatch(displayAlert(e));
//     }
// }

export const displayAlert = text => () => {
    alert(text);
};