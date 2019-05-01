import PolicyRepresentation from './policyRepresentation';
import RoleDefinition from './roleDefinition';

export default interface RolePolicyRepresentation extends PolicyRepresentation {
  roles?: RoleDefinition[];
}
