function contactReducer(state, action) {
  switch (action.type) {
    case "ADD_CONTACT":
      return [...state, action.payload];
    case "DELETE_CONTACT":
      return state.filter((contact) => contact.id !== action.payload);
    case "DELETE_GROUP":
      return state.filter((contact) => !action.payload.includes(contact.id));
    case "EDIT_CONTACT":
      return state.map((contact) =>
        contact.id === action.payload.id
          ? {
              ...contact,
              name: action.payload.name,
              email: action.payload.email,
            }
          : contact
      );
    default:
      return state;
  }
}

export default contactReducer;
