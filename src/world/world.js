const world = {
    entities = [],
    _currentId = 0
};

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

export const addEntity = (entity) => {
    if(entity.id){
        throw {err: 'entiy.id should not be defined'};
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