import * as world from './world';

describe('world', ()=>{
    describe('addEntity', ()=>{
        describe('with id', ()=>{
            it('throws error', ()=>{
                expect(()=> world.addEntity({id: 1})).toThrow()
            });
        })
    })
})