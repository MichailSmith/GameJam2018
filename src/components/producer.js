import componentCreator from './componentCreator';
const DEFAULT_PRODUCER = {
    productionTypes: [],
    currentlyProducing: []
};

export default componentCreator('producer', DEFAULT_PRODUCER);
