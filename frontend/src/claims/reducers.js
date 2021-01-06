import {
    LOAD_CLAIMS,
    VERIFY_CLAIM,
    CONFIRM_CLAIM,
    ADD_CLAIM,
} from './actions';

const initialState = { data: [] }

export const claims = ( state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case VERIFY_CLAIM: {
            const { claim: claimToVerify } = payload;
            return {
                ...state,
                data: state.data.map(claim => {
                    if(claim.id === claimToVerify.id){
                        return {
                            ...claim,
                            isVerified: true,
                        }
                    }
                    return claim
                })
            }
        }
        case CONFIRM_CLAIM: {
            const { claim: claimToConfirm } = payload;
            return {
                ...state,
                data: state.data.map(claim => {
                    if(claim.id === claimToConfirm.id){
                        return {
                            ...claim,
                            isConfirmed: !claim.isConfirmed,
                        }
                    }
                    return claim
                })
            }
        }
        case LOAD_CLAIMS: {
            const { claims } = payload;
            return {
                ...state,
                data: claims
            }
        }
        case ADD_CLAIM: {
            const { claim } = payload;
            return {
                ...state,
                data: state.data.concat(claim),
            }
        }
        default:
            return state
    }
}