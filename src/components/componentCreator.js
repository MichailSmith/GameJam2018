export default (name, defaultItem = {}) => (entity = {}, item={}) =>({
    ...entity,
    [name]:{
        ...defaultItem,
        ...item
    }
});