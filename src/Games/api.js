import { withUrl } from 'common/apiHelpers';

const { get } = withUrl("api")

export default {
  index: jwt => get("games", {jwt}),
  get: (id, jwt) => get("games/$id", {urlParams: {id}, jwt})
}