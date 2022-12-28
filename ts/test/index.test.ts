/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
import * as assert from 'assert/strict';
import { test } from 'mocha';
import { ACCESS_LEVEL_MAPPINGS } from '../src/constants/role.js';
import { encodeRoles, decodeRoles, AccessLevel, Role, hasReaderAccess, hasContributorAccess, hasApproverAccess, hasAdministratorAccess, hasSystemAccess, hasSystemAdministratorAccess, isAuthorized } from '../src/index.js';

describe('Test encodeRoles and decodeRoles', () => {
  test('A list of roles should be the same value after being encoded and decoded', () => {
    const userId = 'test_user_id';
    const organizationId1 = '1';
    const organizationId2 = '2';

    const roles: Role[] = [
      { userId, organizationId: organizationId1, access: AccessLevel.CONTRIBUTOR },
      { userId, organizationId: organizationId1, access: AccessLevel.APPROVER },
      { userId, organizationId: organizationId2, access: AccessLevel.READER },
    ];

    const encodedRoles: string[] = encodeRoles(roles);
    const decodedRoles: Role[] = decodeRoles(encodedRoles, userId);

    assert.deepEqual(decodedRoles, roles);
  });
});

describe('Test ACCESS_LEVEL_MAPPINGS validity', () => {
  test('No access level token codes exceed 1 byte', () => {
    assert.equal(ACCESS_LEVEL_MAPPINGS.every((mapping) => mapping.tokenCode.byteLength === 1), true);
  });

  test('No access level token codes are duplicated', () => {
    const tokenCodeNumbers: Set<number> = new Set();
    ACCESS_LEVEL_MAPPINGS.forEach((mapping) => tokenCodeNumbers.add(mapping.tokenCode[0]));
    assert.equal(tokenCodeNumbers.size, ACCESS_LEVEL_MAPPINGS.length);
  });
});

const testAuthorizationFunction = (
  fn: (organizationId: string, roles: Role[]) => boolean,
  matchingAccess: AccessLevel,
  nonMatchingAccess: AccessLevel,
) => {
  const userId = 'test_user_id';
  const matchingOrgId = '1';
  const nonMatchingOrgId = '0';

  test(`A list of roles containing a ${matchingAccess.toString()} in an organization should return true`, () => {
    const roles: Role[] = [
      { userId, organizationId: matchingOrgId, access: matchingAccess },
      { userId, organizationId: matchingOrgId, access: nonMatchingAccess },
    ];
    assert.equal(fn(matchingOrgId, roles), true);
  });

  test(`A list of roles not containing a ${matchingAccess.toString()} in an organization should return false`, () => {
    const roles: Role[] = [
      { userId, organizationId: matchingOrgId, access: nonMatchingAccess },
    ];
    assert.equal(fn(matchingOrgId, roles), false);
  });

  test(`A list of roles only containing a ${matchingAccess.toString()} for a different organization should return false`, () => {
    const roles: Role[] = [
      { userId, organizationId: nonMatchingOrgId, access: matchingAccess },
      { userId, organizationId: matchingOrgId, access: nonMatchingAccess },
    ];
    assert.equal(fn(matchingOrgId, roles), false);
  });
};

describe('Test isAuthorized', () => {
  const organizationId = '1';
  const access = AccessLevel.READER;
  const roles: Role[] = [{ userId: 'test_user_id', organizationId, access }];

  test('The user should be authorized if one of the required access-level functions returns true', () => {
    const authorized = isAuthorized([hasReaderAccess], organizationId, roles);
    assert.equal(authorized, true);
  });

  test('The user should not be authorized if none of the required access-level functions returns true', () => {
    const authorized = isAuthorized([hasContributorAccess], organizationId, roles);
    assert.equal(authorized, false);
  });
});

describe('Verify hasReaderAccess', () => {
  const fn = hasReaderAccess;
  const matchingAccess = AccessLevel.READER;
  const nonMatchingAccess = AccessLevel.CONTRIBUTOR;

  testAuthorizationFunction(fn, matchingAccess, nonMatchingAccess);
});

describe('Verify hasContributorAccess', () => {
  const fn = hasContributorAccess;
  const matchingAccess = AccessLevel.CONTRIBUTOR;
  const nonMatchingAccess = AccessLevel.READER;

  testAuthorizationFunction(fn, matchingAccess, nonMatchingAccess);
});

describe('Verify hasApproverAccess', () => {
  const fn = hasApproverAccess;
  const matchingAccess = AccessLevel.APPROVER;
  const nonMatchingAccess = AccessLevel.READER;

  testAuthorizationFunction(fn, matchingAccess, nonMatchingAccess);
});

describe('Verify hasAdministratorAccess', () => {
  const fn = hasAdministratorAccess;
  const matchingAccess = AccessLevel.ADMINISTRATOR;
  const nonMatchingAccess = AccessLevel.READER;

  testAuthorizationFunction(fn, matchingAccess, nonMatchingAccess);
});

describe('Verify hasContributorAccess', () => {
  const fn = hasContributorAccess;
  const matchingAccess = AccessLevel.CONTRIBUTOR;
  const nonMatchingAccess = AccessLevel.READER;

  testAuthorizationFunction(fn, matchingAccess, nonMatchingAccess);
});

describe('Verify hasAdministratorAccess', () => {
  const fn = hasAdministratorAccess;
  const matchingAccess = AccessLevel.ADMINISTRATOR;
  const nonMatchingAccess = AccessLevel.READER;

  testAuthorizationFunction(fn, matchingAccess, nonMatchingAccess);
});

describe('Verify hasSystemAccess', () => {
  const fn = hasSystemAccess;
  const matchingAccess = AccessLevel.SYSTEM;
  const nonMatchingAccess = AccessLevel.READER;

  testAuthorizationFunction(fn, matchingAccess, nonMatchingAccess);
});

describe('Verify hasSystemAdministratorAccess', () => {
  const fn = hasSystemAdministratorAccess;
  const matchingAccess = AccessLevel.SYSTEM_ADMINISTRATOR;
  const nonMatchingAccess = AccessLevel.READER;

  testAuthorizationFunction(fn, matchingAccess, nonMatchingAccess);
});
