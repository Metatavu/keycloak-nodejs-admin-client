import PolicyRepresentation from './policyRepresentation';

export default interface UserPolicyRepresentation extends PolicyRepresentation {
  users?: string[];
}
