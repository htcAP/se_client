export const initialState = {
  router: {},
};

export function reducer(state = initialState, action = {}) {

  switch (action.type) {
    case 'focus':
    return {
      ...state,
      scene: action.scene,
    };

    default:
    return state;
  }

}
