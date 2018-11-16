
export const update = (world,  systems) => function(){
    const self = this;
    systems.forEach((system)=>{
        world.getEntities(...(system.components)).forEach((entity, index)=>{
            system.update(entity, world, self, index);
        });
    });
}