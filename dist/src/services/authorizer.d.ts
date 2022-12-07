import { OrganizationType } from '../constants/role.js';
import { Role } from '../interfaces/role.js';
/**
 * Encodes a list of user roles into a single shortened string to better fit in JWT tokens
 *
 * @param roles - list of a user's roles within his organizations
 * @returns an encoded string containing all of a user's roles within his organizations
 */
export declare const encodeRoles: (roles: Role[]) => string;
/**
 * Decodes a string from the JWT into a list of user roles
 *
 * @param encodedRoleString - encoded string that contains all of the user's roles within his organizations
 * @param userId - user's ID
 * @returns a list of a user's roles within his organizations
 */
export declare const decodeRoles: (encodedRoleString: string, userId: string) => Role[];
/**
 * Determines if any of the user's roles in a particular organization are authorized
 *
 * @param accessChecks - array of access-level checks that will authorize the user if *any* return true
 * @param organizationId - id of the organization to check for user's access
 * @param organizationType - type of organization to check for user's access
 * @param userRoles - user's roles from their JWT token
 * @returns whether the user is authorized
 */
export declare const isAuthorized: (accessChecks: ((organizationId: number, organizationType: OrganizationType, userRoles: Role[]) => boolean)[], organizationId: number, organizationType: OrganizationType, userRoles: Role[]) => boolean;
/**
 * Determines whether the user has reader access in the given organization
 *
 * @param organizationId - id of the organization to check for user's access
 * @param organizationType - type of organization to check for user's access
 * @param userRoles - user's roles from their JWT token
 * @returns whether the user has reader access in the given organization
 */
export declare const hasReaderAccess: (organizationId: number, organizationType: OrganizationType, userRoles: Role[]) => boolean;
/**
* Determines whether the user has contributor access in the given organization
*
* @param organizationId - id of the organization to check for user's access
* @param organizationType - type of organization to check for user's access
* @param userRoles - user's roles from their JWT token
* @returns whether the user has contributor access in the given organization
*/
export declare const hasContributorAccess: (organizationId: number, organizationType: OrganizationType, userRoles: Role[]) => boolean;
/**
* Determines whether the user has approver access in the given organization
*
* @param organizationId - id of the organization to check for user's access
* @param organizationType - type of organization to check for user's access
* @param userRoles - user's roles from their JWT token
* @returns whether the user has approver access in the given organization
*/
export declare const hasApproverAccess: (organizationId: number, organizationType: OrganizationType, userRoles: Role[]) => boolean;
/**
* Determines whether the user has administrator access in the given organization
*
* @param organizationId - id of the organization to check for user's access
* @param organizationType - type of organization to check for user's access
* @param userRoles - user's roles from their JWT token
* @returns whether the user has administrator access in the given organization
*/
export declare const hasAdministratorAccess: (organizationId: number, organizationType: OrganizationType, userRoles: Role[]) => boolean;
/**
* Determines whether the user has system access in the given organization
*
* @param organizationId - id of the organization to check for user's access
* @param organizationType - type of organization to check for user's access
* @param userRoles - user's roles from their JWT token
* @returns whether the user has system access in the given organization
*/
export declare const hasSystemAccess: (organizationId: number, organizationType: OrganizationType, userRoles: Role[]) => boolean;
/**
* Determines whether the user has system administrator access in the given organization
*
* @param organizationId - id of the organization to check for user's access
* @param organizationType - type of organization to check for user's access
* @param userRoles - user's roles from their JWT token
* @returns whether the user has system administrator access in the given organization
*/
export declare const hasSystemAdministratorAccess: (organizationId: number, organizationType: OrganizationType, userRoles: Role[]) => boolean;
//# sourceMappingURL=authorizer.d.ts.map