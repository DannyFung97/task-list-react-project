import { createSelector } from 'reselect';

export const isLoading = state => state.isLoading;
export const getClaims = state => state.claims.data;

export const getVerifiedClaims = createSelector(
    getClaims,
    (claims) => claims.filter(claim => claim.isVerified),
);

export const getUnverifiedClaims = createSelector(
    getClaims,
    (claims) => claims.filter(claim => !claim.isVerified),
);