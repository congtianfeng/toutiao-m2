export const getItemm = (val) => JSON.parse(localStorage.getItem(val))
export const setItemm = (val1, val2) => localStorage.setItem(val1, JSON.stringify(val2))
export const removeItemm = val => localStorage.removeItem(val)
