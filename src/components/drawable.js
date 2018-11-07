const DEFAULT_DRAW = {
    asset: 'missing',
    size: {
        height: 16,
        width: 16
    }
};

export default (entity = {}, draw = {}) =>({
    ...entity,
    draw: {
        ...DEFAULT_DRAW,
        ...draw
    }
});