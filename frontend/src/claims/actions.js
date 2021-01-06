export const LOAD_CLAIMS = "LOAD_CLAIMS";
export const loadClaims = claims => ({
    type: LOAD_CLAIMS,
    payload: { claims }
})

export const VERIFY_CLAIM = "VERIFY_CLAIM";
export const verifyClaim = claim => ({
    type: VERIFY_CLAIM,
    payload: { claim }
})

export const CONFIRM_CLAIM = "CONFIRM_CLAIM";
export const confirmClaim = claim => ({
    type: CONFIRM_CLAIM,
    payload: { claim }
})

export const ADD_CLAIM = "ADD_CLAIM";
export const addClaim = claim => ({
    type: ADD_CLAIM,
    payload: { claim }
})