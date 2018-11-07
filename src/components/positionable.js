const DEFAULT_POSITION = {x: 0, y: 0, z:0}

export default (entity = {} , position = {}) => ({
    ...entity,
    position: {...DEFAULT_POSITION, ...position}
});