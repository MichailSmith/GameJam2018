
export const update = (world,  systems) => ()=>{
   systems.forEach((system)=>{
       world.getEntities(...(system.components)).forEach((entity, index)=>{
           system.update(entity, world, index);
       });
   });
}