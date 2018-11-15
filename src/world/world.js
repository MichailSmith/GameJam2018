const DEFAULT_WORLD = {
    entities: [],
    _currentId: 0
};

let world = {...DEFAULT_WORLD};

const createEntity = (entity) => {
    if(entity.id){
        return entity;
    }
    world._currentId++;
    return {
        ...entity,
        id: world._currentId
    };
};

export const resetWorld = (newWorld)=> world = {...DEFAULT_WORLD, ...newWorld};

export const addEntity = (entity) => {
    if(entity.id){
        throw new Error('entiy.id should not be defined');
    } else {
        world.entities = world.entities.concat(createEntity(entity));
    }
};

export const removeEntity = (entityId) => {
    world.entities = world.entities.filter(({id})=> id !== entityId)
};

export const getEntities = (...components) => components.length === 0 ? 
    world.entities: 
    world.entities.filter(entity => !components.find(component=> !entity[component]));

export const updateEntity = (id, updater) => {
    world.entities = world.entities.map(entity => entity.id === id? updater(entity): entity);
};