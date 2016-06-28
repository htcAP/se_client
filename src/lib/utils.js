
export function genActionConstants(prefix, actions) {
  let ret = {};

  actions.forEach((action) => {
    ret[action] = prefix + action;
  });

  return ret;
}
