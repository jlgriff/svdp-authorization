import { AccessLevelEncoding, OrganizationTypeEncoding } from '../interfaces/encoding.js';

export enum AccessLevel {
  READER = 'reader',
  CONTRIBUTOR = 'contributor',
  APPROVER = 'approver',
  ADMINISTRATOR = 'administrator',
}

export enum OrganizationType {
  CONFERENCE = 'conference',
  COUNCIL = 'council',
}

export const ACCESS_LEVEL_MAPPINGS: AccessLevelEncoding[] = [
  { access: AccessLevel.READER, tokenCode: new Uint8Array([10]), label: AccessLevel.READER.toString() },
  { access: AccessLevel.CONTRIBUTOR, tokenCode: new Uint8Array([20]), label: AccessLevel.CONTRIBUTOR.toString() },
  { access: AccessLevel.APPROVER, tokenCode: new Uint8Array([30]), label: AccessLevel.APPROVER.toString() },
  { access: AccessLevel.ADMINISTRATOR, tokenCode: new Uint8Array([100]), label: AccessLevel.ADMINISTRATOR.toString() },
];

export const ORGANIZATION_TYPE_MAPPINGS: OrganizationTypeEncoding[] = [
  { type: OrganizationType.CONFERENCE, tokenCode: new Uint8Array([10]), label: OrganizationType.CONFERENCE.toString() },
  { type: OrganizationType.COUNCIL, tokenCode: new Uint8Array([20]), label: OrganizationType.COUNCIL.toString() },
];