import Resource from './resource';
import ClientRepresentation from '../defs/clientRepresentation';
import { KeycloakAdminClient } from '../client';
import RoleRepresentation from '../defs/roleRepresentation';
import UserRepresentation from '../defs/userRepresentation';
import CredentialRepresentation from '../defs/credentialRepresentation';
import ResourceRepresentation from '../defs/resourceRepresentation';
import PolicyRepresentation from '../defs/policyRepresentation';
import GroupPolicyRepresentation from '../defs/groupPolicyRepresentation';
import UserPolicyRepresentation from '../defs/userPolicyRepresentation';
import ScopeRepresentation from '../defs/scopeRepresentation';
import RolePolicyRepresentation from '../defs/rolePolicyRepresentation';

export interface ClientQuery {
  clientId?: string;
  viewableOnly?: boolean;
}

export class Clients extends Resource<{ realm?: string }> {
  public find = this.makeRequest<ClientQuery, ClientRepresentation[]>({
    method: 'GET',
  });

  public create = this.makeRequest<ClientRepresentation, {id: string}>({
    method: 'POST',
    returnResourceIdInLocationHeader: {field: 'id'},
  });

  /**
   * Single client
   */

  public findOne = this.makeRequest<{id: string}, ClientRepresentation>({
    method: 'GET',
    path: '/{id}',
    urlParamKeys: ['id'],
    catchNotFound: true,
  });

  public update = this.makeUpdateRequest<
    {id: string},
    ClientRepresentation,
    void
  >({
    method: 'PUT',
    path: '/{id}',
    urlParamKeys: ['id'],
  });

  public del = this.makeRequest<{id: string}, void>({
    method: 'DELETE',
    path: '/{id}',
    urlParamKeys: ['id'],
  });

  /**
   * Client roles
   */

  public createRole = this.makeRequest<RoleRepresentation, {roleName: string}>({
    method: 'POST',
    path: '/{id}/roles',
    urlParamKeys: ['id'],
    returnResourceIdInLocationHeader: {field: 'roleName'},
  });

  public listRoles = this.makeRequest<{id: string}, RoleRepresentation[]>({
    method: 'GET',
    path: '/{id}/roles',
    urlParamKeys: ['id'],
  });

  public findRole = this.makeRequest<
    {id: string; roleName: string},
    RoleRepresentation
  >({
    method: 'GET',
    path: '/{id}/roles/{roleName}',
    urlParamKeys: ['id', 'roleName'],
    catchNotFound: true,
  });

  public updateRole = this.makeUpdateRequest<
    {id: string; roleName: string},
    RoleRepresentation,
    void
  >({
    method: 'PUT',
    path: '/{id}/roles/{roleName}',
    urlParamKeys: ['id', 'roleName'],
  });

  public delRole = this.makeRequest<{id: string; roleName: string}, void>({
    method: 'DELETE',
    path: '/{id}/roles/{roleName}',
    urlParamKeys: ['id', 'roleName'],
  });

  public findUsersWithRole = this.makeRequest<
    {id: string; roleName: string; first?: number; max?: number},
    UserRepresentation[]
  >({
    method: 'GET',
    path: '/{id}/roles/{roleName}/users',
    urlParamKeys: ['id', 'roleName'],
  });

  /**
   * Service account user
   */

  public getServiceAccountUser = this.makeRequest<
    {id: string},
    UserRepresentation
  >({
    method: 'GET',
    path: '/{id}/service-account-user',
    urlParamKeys: ['id'],
  });

  /**
   * Client secret
   */

  public generateNewClientSecret = this.makeRequest<{id: string}, {id: string}>(
    {
      method: 'POST',
      path: '/{id}/client-secret',
      urlParamKeys: ['id'],
    },
  );

  public getClientSecret = this.makeRequest<
    {id: string},
    CredentialRepresentation
  >({
    method: 'GET',
    path: '/{id}/client-secret',
    urlParamKeys: ['id'],
  });

  public createAuthzResource = this.makeRequest<{
    id: string,
    resource: ResourceRepresentation,
  }, ResourceRepresentation>({
    method: 'POST',
    path: '/{id}/authz/resource-server/resource',
    urlParamKeys: ['id'],
    payloadKey: 'resource',
  });

  public listAuthzResources = this.makeRequest<{
    id: string,
    deep?: boolean,
    first?: number,
    max?: number,
    uri?: string,
  }, ResourceRepresentation[]>({
    method: 'GET',
    path: '/{id}/authz/resource-server/resource',
    urlParamKeys: ['id'],
  });

  public createAuthzGroupPolicy = this.makeRequest<{
    id: string,
    policy: GroupPolicyRepresentation,
  }, GroupPolicyRepresentation>({
    method: 'POST',
    path: '/{id}/authz/resource-server/policy/group',
    urlParamKeys: ['id'],
    payloadKey: 'policy',
  });


  public createAuthzRolePolicy = this.makeRequest<{
    id: string,
    policy: RolePolicyRepresentation,
  }, RolePolicyRepresentation>({
    method: 'POST',
    path: '/{id}/authz/resource-server/policy/role',
    urlParamKeys: ['id'],
    payloadKey: 'policy',
  });

  public createAuthzUserPolicy = this.makeRequest<{
    id: string,
    policy: UserPolicyRepresentation,
  }, UserPolicyRepresentation>({
    method: 'POST',
    path: '/{id}/authz/resource-server/policy/user',
    urlParamKeys: ['id'],
    payloadKey: 'policy',
  });

  public listAuthzPermissionScopes = this.makeRequest<{
    id: string,
    policyId: string,
  }, ScopeRepresentation[]>({
    method: 'GET',
    path: '/{id}/authz/resource-server/policy/{policyId}/scopes',
    urlParamKeys: ['id', 'policyId'],
  });

  public listAuthzPolicies = this.makeRequest<{
    id: string,
    first?: number,
    max?: number,
    name?: string,
    permission?: boolean,
  }, PolicyRepresentation[]>({
    method: 'GET',
    path: '/{id}/authz/resource-server/policy',
    urlParamKeys: ['id'],
  });

  public listAuthzRolePolicies = this.makeRequest<{
    id: string,
    first?: number,
    max?: number,
    name?: string,
    permission?: boolean,
  }, RolePolicyRepresentation[]>({
    method: 'GET',
    path: '/{id}/authz/resource-server/policy/role',
    urlParamKeys: ['id'],
  });

  public listAuthzGroupPolicies = this.makeRequest<{
    id: string,
    first?: number,
    max?: number,
    name?: string,
    permission?: boolean,
  }, GroupPolicyRepresentation[]>({
    method: 'GET',
    path: '/{id}/authz/resource-server/policy/group',
    urlParamKeys: ['id'],
  });

  public listAuthzUserPolicies = this.makeRequest<{
    id: string,
    first?: number,
    max?: number,
    name?: string,
    permission?: boolean,
  }, UserPolicyRepresentation[]>({
    method: 'GET',
    path: '/{id}/authz/resource-server/policy/user',
    urlParamKeys: ['id'],
  });

  public createAuthzScopePermission = this.makeRequest<{
    id: string,
    permission: PolicyRepresentation,
  }, void>({
    method: 'POST',
    path: '/{id}/authz/resource-server/permission/scope',
    urlParamKeys: ['id'],
    payloadKey: 'permission',
  });

  public updateAuthzScopePermission = this.makeRequest<{
    id: string,
    permission: PolicyRepresentation,
    permissionId: string,
  }, void>({
    method: 'PUT',
    path: '/{id}/authz/resource-server/permission/scope/{permissionId}',
    urlParamKeys: ['id', 'permissionId'],
    payloadKey: 'permission',
  });

  public listAuthzPermissions = this.makeRequest<{
    id: string,
    first?: number,
    max?: number,
    name?: string,
  }, PolicyRepresentation[]>({
    method: 'GET',
    path: '/{id}/authz/resource-server/permission',
    urlParamKeys: ['id'],
  });

  public listAuthzPermissionAssociatedPolicies = this.makeRequest<{
    id: string,
    permissionId: string
  }, PolicyRepresentation[]>({
    method: 'GET',
    path: '/{id}/authz/resource-server/policy/{permissionId}/associatedPolicies',
    urlParamKeys: ['id', 'permissionId'],
  });

  public deleteAuthzPermission = this.makeRequest<{
    id: string,
    permissionId: string,
  }, void>({
    method: 'DELETE',
    path: '/{id}/authz/resource-server/permission/{permissionId}',
    urlParamKeys: ['id', 'permissionId'],
  });

  constructor(client: KeycloakAdminClient) {
    super(client, {
      path: '/admin/realms/{realm}/clients',
      getUrlParams: () => ({
        realm: client.realmName,
      }),
      getBaseUrl: () => client.baseUrl,
    });
  }
}
