import { encodeRoles, decodeRoles } from '../index.js';
import { Role, OrganizationType, AccessLevel } from '../interface/role.js';

process.env.NODE_ENV = 'test';

describe('Verify encodeRoles and decodeRoles', () => {
  test('A list of roles should be the same value after being encoded and decoded', () => {
    const userId = 'test_user_id';
    const organizationId1 = 1;
    const organizationId2 = 2;

    const roles: Role[] = [
      {
        userId,
        organizationId: organizationId1,
        organizationType: OrganizationType.CONFERENCE,
        access: AccessLevel.CONTRIBUTOR,
      },
      {
        userId,
        organizationId: organizationId1,
        organizationType: OrganizationType.CONFERENCE,
        access: AccessLevel.APPROVER,
      },
      {
        userId,
        organizationId: organizationId2,
        organizationType: OrganizationType.COUNCIL,
        access: AccessLevel.READER,
      },
    ];

    const encodedRoles: string = encodeRoles(roles);
    const decodedRoles: Role[] = decodeRoles(encodedRoles, userId);

    expect(decodedRoles).toEqual(roles);
  });
});
