/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
import { ACCESS_LEVEL_MAPPINGS, ORGANIZATION_TYPE_MAPPINGS } from '../constants/role.js';
import { encodeRoles, decodeRoles, OrganizationType, AccessLevel, hasReaderAccess, hasContributorAccess, hasApproverAccess, hasAdministratorAccess, hasSystemAccess, hasSystemAdministratorAccess, isAuthorized } from '../index.js';
process.env.NODE_ENV = 'test';
describe('Verify encodeRoles and decodeRoles', () => {
    test('A list of roles should be the same value after being encoded and decoded', () => {
        const userId = 'test_user_id';
        const organizationId1 = 1;
        const organizationId2 = 2;
        const roles = [
            { userId, organizationId: organizationId1, organizationType: OrganizationType.CONFERENCE, access: AccessLevel.CONTRIBUTOR },
            { userId, organizationId: organizationId1, organizationType: OrganizationType.CONFERENCE, access: AccessLevel.APPROVER },
            { userId, organizationId: organizationId2, organizationType: OrganizationType.COUNCIL, access: AccessLevel.READER },
        ];
        const encodedRoles = encodeRoles(roles);
        const decodedRoles = decodeRoles(encodedRoles, userId);
        expect(decodedRoles).toEqual(roles);
    });
});
describe('Verify ACCESS_LEVEL_MAPPINGS validity', () => {
    test('No access level token codes exceed 1 byte', () => {
        expect(ACCESS_LEVEL_MAPPINGS.every((mapping) => mapping.tokenCode.byteLength === 1))
            .toEqual(true);
    });
    test('No access level token codes are duplicated', () => {
        const tokenCodeNumbers = new Set();
        ACCESS_LEVEL_MAPPINGS.forEach((mapping) => tokenCodeNumbers.add(mapping.tokenCode[0]));
        expect(tokenCodeNumbers.size).toEqual(ACCESS_LEVEL_MAPPINGS.length);
    });
});
describe('Verify ORGANIZATION_TYPE_MAPPINGS validity', () => {
    test('No organization type token codes exceed 1 byte', () => {
        expect(ORGANIZATION_TYPE_MAPPINGS.every((mapping) => mapping.tokenCode.byteLength === 1))
            .toEqual(true);
    });
    test('No organization type token codes are duplicated', () => {
        const tokenCodeNumbers = new Set();
        ORGANIZATION_TYPE_MAPPINGS.forEach((mapping) => tokenCodeNumbers.add(mapping.tokenCode[0]));
        expect(tokenCodeNumbers.size).toEqual(ORGANIZATION_TYPE_MAPPINGS.length);
    });
});
const testAuthorizationFunction = (fn, matchingAccess, nonMatchingAccess, matchingOrgType, nonMatchingOrgType) => {
    const userId = 'test_user_id';
    const matchingOrgId = 1;
    const nonMatchingOrgId = 0;
    test(`A list of roles containing a ${matchingAccess.toString()} in an organization should return true`, () => {
        const roles = [
            { userId, organizationId: matchingOrgId, organizationType: matchingOrgType, access: matchingAccess },
            { userId, organizationId: matchingOrgId, organizationType: matchingOrgType, access: nonMatchingAccess },
        ];
        expect(fn(matchingOrgId, matchingOrgType, roles)).toEqual(true);
    });
    test(`A list of roles not containing a ${matchingAccess.toString()} in an organization should return false`, () => {
        const roles = [
            { userId, organizationId: matchingOrgId, organizationType: matchingOrgType, access: nonMatchingAccess },
        ];
        expect(fn(matchingOrgId, matchingOrgType, roles)).toEqual(false);
    });
    test(`A list of roles only containing a ${matchingAccess.toString()} for a different organization type should return false`, () => {
        const roles = [
            { userId, organizationId: matchingOrgId, organizationType: nonMatchingOrgType, access: matchingAccess },
            { userId, organizationId: matchingOrgId, organizationType: nonMatchingOrgType, access: nonMatchingAccess },
        ];
        expect(fn(matchingOrgId, matchingOrgType, roles)).toEqual(false);
    });
    test(`A list of roles only containing a ${matchingAccess.toString()} for a different organization should return false`, () => {
        const roles = [
            { userId, organizationId: nonMatchingOrgId, organizationType: matchingOrgType, access: matchingAccess },
            { userId, organizationId: matchingOrgId, organizationType: matchingOrgType, access: nonMatchingAccess },
        ];
        expect(fn(matchingOrgId, matchingOrgType, roles)).toEqual(false);
    });
};
describe('Verify isAuthorized', () => {
    const organizationId = 1;
    const organizationType = OrganizationType.CONFERENCE;
    const access = AccessLevel.READER;
    const roles = [{ userId: 'test_user_id', organizationId, organizationType, access }];
    test('The user should be authorized if one of the required access-level functions returns true', () => {
        const authorized = isAuthorized([hasReaderAccess], organizationId, organizationType, roles);
        expect(authorized).toEqual(true);
    });
    test('The user should not be authorized if none of the required access-level functions returns true', () => {
        const authorized = isAuthorized([hasContributorAccess], organizationId, organizationType, roles);
        expect(authorized).toEqual(false);
    });
});
describe('Verify hasReaderAccess', () => {
    const fn = hasReaderAccess;
    const matchingAccess = AccessLevel.READER;
    const nonMatchingAccess = AccessLevel.CONTRIBUTOR;
    const matchingOrgType = OrganizationType.CONFERENCE;
    const nonMatchingOrgType = OrganizationType.COUNCIL;
    testAuthorizationFunction(fn, matchingAccess, nonMatchingAccess, matchingOrgType, nonMatchingOrgType);
});
describe('Verify hasContributorAccess', () => {
    const fn = hasContributorAccess;
    const matchingAccess = AccessLevel.CONTRIBUTOR;
    const nonMatchingAccess = AccessLevel.READER;
    const matchingOrgType = OrganizationType.CONFERENCE;
    const nonMatchingOrgType = OrganizationType.COUNCIL;
    testAuthorizationFunction(fn, matchingAccess, nonMatchingAccess, matchingOrgType, nonMatchingOrgType);
});
describe('Verify hasApproverAccess', () => {
    const fn = hasApproverAccess;
    const matchingAccess = AccessLevel.APPROVER;
    const nonMatchingAccess = AccessLevel.READER;
    const matchingOrgType = OrganizationType.CONFERENCE;
    const nonMatchingOrgType = OrganizationType.COUNCIL;
    testAuthorizationFunction(fn, matchingAccess, nonMatchingAccess, matchingOrgType, nonMatchingOrgType);
});
describe('Verify hasAdministratorAccess', () => {
    const fn = hasAdministratorAccess;
    const matchingAccess = AccessLevel.ADMINISTRATOR;
    const nonMatchingAccess = AccessLevel.READER;
    const matchingOrgType = OrganizationType.CONFERENCE;
    const nonMatchingOrgType = OrganizationType.COUNCIL;
    testAuthorizationFunction(fn, matchingAccess, nonMatchingAccess, matchingOrgType, nonMatchingOrgType);
});
describe('Verify hasContributorAccess', () => {
    const fn = hasContributorAccess;
    const matchingAccess = AccessLevel.CONTRIBUTOR;
    const nonMatchingAccess = AccessLevel.READER;
    const matchingOrgType = OrganizationType.CONFERENCE;
    const nonMatchingOrgType = OrganizationType.COUNCIL;
    testAuthorizationFunction(fn, matchingAccess, nonMatchingAccess, matchingOrgType, nonMatchingOrgType);
});
describe('Verify hasAdministratorAccess', () => {
    const fn = hasAdministratorAccess;
    const matchingAccess = AccessLevel.ADMINISTRATOR;
    const nonMatchingAccess = AccessLevel.READER;
    const matchingOrgType = OrganizationType.CONFERENCE;
    const nonMatchingOrgType = OrganizationType.COUNCIL;
    testAuthorizationFunction(fn, matchingAccess, nonMatchingAccess, matchingOrgType, nonMatchingOrgType);
});
describe('Verify hasSystemAccess', () => {
    const fn = hasSystemAccess;
    const matchingAccess = AccessLevel.SYSTEM;
    const nonMatchingAccess = AccessLevel.READER;
    const matchingOrgType = OrganizationType.CONFERENCE;
    const nonMatchingOrgType = OrganizationType.COUNCIL;
    testAuthorizationFunction(fn, matchingAccess, nonMatchingAccess, matchingOrgType, nonMatchingOrgType);
});
describe('Verify hasSystemAdministratorAccess', () => {
    const fn = hasSystemAdministratorAccess;
    const matchingAccess = AccessLevel.SYSTEM_ADMINISTRATOR;
    const nonMatchingAccess = AccessLevel.READER;
    const matchingOrgType = OrganizationType.CONFERENCE;
    const nonMatchingOrgType = OrganizationType.COUNCIL;
    testAuthorizationFunction(fn, matchingAccess, nonMatchingAccess, matchingOrgType, nonMatchingOrgType);
});
