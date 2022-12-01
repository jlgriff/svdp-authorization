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
 * Determines whether the user has reader access in the given organization
 *
 * @param organizationId - id of the organization to check for user's access
 * @param organizationType - type of organization to check for user's access
 * @param roles - user's roles from their JWT token
 * @returns whether the user has reader access in the given organization
 */
export declare const hasReaderRole: (organizationId: number, organizationType: OrganizationType, roles: Role[]) => boolean;
/**
* Determines whether the user has contributor access in the given organization
*
* @param organizationId - id of the organization to check for user's access
* @param organizationType - type of organization to check for user's access
* @param roles - user's roles from their JWT token
* @returns whether the user has contributor access in the given organization
*/
export declare const hasContributorRole: (organizationId: number, organizationType: OrganizationType, roles: Role[]) => boolean;
/**
* Determines whether the user has approver access in the given organization
*
* @param organizationId - id of the organization to check for user's access
* @param organizationType - type of organization to check for user's access
* @param roles - user's roles from their JWT token
* @returns whether the user has approver access in the given organization
*/
export declare const hasApproverRole: (organizationId: number, organizationType: OrganizationType, roles: Role[]) => boolean;
/**
* Determines whether the user has administrator access in the given organization
*
* @param organizationId - id of the organization to check for user's access
* @param organizationType - type of organization to check for user's access
* @param roles - user's roles from their JWT token
* @returns whether the user has administrator access in the given organization
*/
export declare const hasAdministratorRole: (organizationId: number, organizationType: OrganizationType, roles: Role[]) => boolean;
/**
* Determines whether the user has system access in the given organization
*
* @param organizationId - id of the organization to check for user's access
* @param organizationType - type of organization to check for user's access
* @param roles - user's roles from their JWT token
* @returns whether the user has system access in the given organization
*/
export declare const hasSystemRole: (organizationId: number, organizationType: OrganizationType, roles: Role[]) => boolean;
/**
* Determines whether the user has system administrator access in the given organization
*
* @param organizationId - id of the organization to check for user's access
* @param organizationType - type of organization to check for user's access
* @param roles - user's roles from their JWT token
* @returns whether the user has system administrator access in the given organization
*/
export declare const hasSystemAdministratorRole: (organizationId: number, organizationType: OrganizationType, roles: Role[]) => boolean;
