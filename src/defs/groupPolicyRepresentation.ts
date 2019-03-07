import PolicyRepresentation from './policyRepresentation';
import GroupRepresentation from './groupRepresentation';

export default interface GroupPolicyRepresentation extends PolicyRepresentation {
  groupsClaim?: string;
  groups?: GroupRepresentation[];
}
