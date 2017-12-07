import { withUrl } from 'common/apiHelpers';

const { get } = withUrl("auth"); 

export default {
  login: (provider, jwt) => get("login", {queries: {provider, jwt}})
}