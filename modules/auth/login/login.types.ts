import {
  LoginMutation,
  LoginWithAuthProviderMutation,
} from 'generated/graphql';

export interface LoginResponseType {
  data:
    | LoginMutation['login']
    | LoginWithAuthProviderMutation['loginWithAuthProvider']
    | undefined;
}
