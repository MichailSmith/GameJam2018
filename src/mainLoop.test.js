import { update } from './mainLoop';

let defaultWorld = {}

describe('update', ()=>{
    beforeEach(()=>{
        defaultWorld = {
            addEntity: jest.fn(()=>undefined), 
            removeEntity: jest.fn(()=>undefined), 
            getEntities: jest.fn(()=>[]), 
            updateEntity: jest.fn(()=>undefined)
        };
    });
    describe('with no entities to update', ()=> {
        describe('with a system', ()=>{
            it('does not call any system methods', ()=>{
                const systemFn = jest.fn();
                update(defaultWorld, [{components: ['foo'], update: systemFn}] )();
                expect(systemFn).toBeCalledTimes(0);
            });
            it('attempts to fetch entities system provided', ()=>{

                update(defaultWorld, [{components: ['foo']}] )();
                expect(defaultWorld.getEntities).toBeCalledWith('foo');
            });
        });

        
    });
    describe('with multiple entities to update', ()=>{
        const entities = [
            {
                id:1,
                component1: 'foo'
            },
            {
                id: 2,
                component1: 'bar',
                component2: 'bas'
            },
            {
                id: 3, 
                component3: {}
            }
        ]
        beforeEach(()=>{
            defaultWorld.getEntities = jest.fn((...components)=>entities.filter(entity=> components.every(component => entity[component])));
        });
        describe('with matching systems', ()=>{
            it('calls update on all matching systems', ()=>{
                const systemFn = jest.fn();
                const systems = [
                    {
                        components: ['component1', 'component2'],
                        update: systemFn
                    },
                    {
                        components: ['component3'],
                        update: systemFn
                    },{
                        components: ['component1'],
                        update: systemFn
                    }
                ];
                update(defaultWorld, systems)();
                expect(systemFn).toBeCalledTimes(4);
            });
            it('passes world, entity, index, and this to system update', ()=>{
                const systemFn = jest.fn();
                const systems = [
                    {
                        components: ['component1', 'component2'],
                        update: systemFn
                    }
                ];
                update(defaultWorld, systems).apply('this');
                expect(systemFn).toBeCalledWith({
                    id: 2,
                    component1: 'bar',
                    component2: 'bas'
                }, defaultWorld, 'this', 0);
            })
        });
    });
})