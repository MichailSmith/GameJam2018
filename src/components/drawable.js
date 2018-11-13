import componentCreator from './componentCreator';
const DEFAULT_DRAW = {
    asset: 'missing',
    size: {
        height: 16,
        width: 16
    }
};

export default componentCreator('draw', DEFAULT_DRAW);