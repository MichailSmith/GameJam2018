import * as world from './world';

describe('world', ()=>{
    afterEach(()=>world.resetWorld());
    
    describe('resetWorld', ()=>{
        describe('with no argument', ()=>{
            it('resets entities to default', ()=>{
                world.addEntity({});
                world.resetWorld();
                expect(world.getEntities()).toEqual([]);
            });
            it('resets next entity id to 1', ()=>{
                world.addEntity({});
                world.resetWorld({});
                world.addEntity({});
                expect(world.getEntities()).toEqual([{id: 1}]);
            });
        });
        describe('with entities', ()=>{
            it('sets entities to provided list', ()=>{
                world.addEntity({});
                world.resetWorld({entities: [{id:2}]});
                expect(world.getEntities()).toEqual([{id:2}]);
            });
            it('resets the next entity id based on new entities', ()=>{
                world.addEntity({});
                world.resetWorld({entities: [{id: 5}]});
                world.addEntity({});
                expect(world.getEntities()).toEqual([{id: 5}, {id: 6}])
            })
        })
    });

    describe('addEntity', ()=>{
        describe('with id', ()=>{
            it('throws error', ()=>{
                expect(()=> world.addEntity({id: 1})).toThrow()
            });
        });
        describe('without id', ()=>{
            it('adds entity to collection and sets id', ()=>{
                world.addEntity({});
                expect(world.getEntities()).toEqual([{id:1}])
            });
        });
    });

    describe('getEntities', ()=>{
        describe('with no entities', ()=>{
            it('returns empty array', ()=>{
                expect(world.getEntities()).toEqual([]);
            });
        });
        describe('with multiple entities', ()=> {
            const entities = [
                { id: 1 },
                {id: 2, component: {}},
                {id: 3, otherComponent: {}},
                {id: 4, component: {}, otherComponent:{}}
            ];
            describe('with no component filters', ()=>{
                it('returns all entities', ()=>{
                    world.resetWorld({entities});
                    expect(world.getEntities()).toEqual(entities);
                });
            });
            describe('with a component filter', ()=>{
                it('returns only entities with that component', ()=>{
                    world.resetWorld({entities});
                    expect(world.getEntities('component')).toEqual([{id:2, component:{}}, {id:4, component:{}, otherComponent:{}}]);
                });
            });
            describe('with multiple component filters', ()=>{
                it('returns only entities that have all those components', ()=>{
                    world.resetWorld({entities});
                    expect(world.getEntities('component', 'otherComponent')).toEqual([{id:4, component:{}, otherComponent:{}}]);
                });
            });
        })
    });

    describe('removeEntity', ()=>{
        const entities = [{id:1}, {id:2}, {id:3}];
        describe('with matching id', ()=>{
            it('removes entity', ()=>{
                world.resetWorld({entities});
                world.removeEntity(2);
                expect(world.getEntities()).toEqual([{id:1}, {id:3}]);
            });
        });
        describe('without matching id', ()=>{
            it('does nothing', ()=>{
                world.resetWorld({entities});
                world.removeEntity(4);
                expect(world.getEntities()).toEqual(entities);
            });
        });
    });

    describe('updateEntities', ()=>{
        const entities = [{id:1}, {id:2}, {id:3}]; 
        describe('with matching id', ()=>{
            it('calls update function on entity', ()=>{
                let updatedEntities = []
                world.resetWorld({entities});
                world.updateEntity(1, (e)=>updatedEntities.push(e));
                expect(updatedEntities).toEqual([{id:1}]);
            });
            it('replaces entity with updated entity', ()=>{
                world.resetWorld({entities});
                world.updateEntity(2, e=> ({...e, updated: true}));
                expect(world.getEntities()).toEqual([{id:1}, {id:2, updated:true}, {id:3}]);
            });
        });
        describe('without matching id', ()=>{
            it('never calls function', ()=>{
                let updateCalled= false;
                world.resetWorld({entities});
                world.updateEntity(4, ()=> updateCalled = true);
                expect(updateCalled).toEqual(false);
            });
            it('does not change entity list', ()=>{
                world.resetWorld({entities});
                world.updateEntity(0, ()=> 'something different');
                expect(world.getEntities()).toEqual(entities);
            })
        })
    });
})