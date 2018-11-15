import componentCreator from './componentCreator';

describe('componentCreator', ()=>{
    const componentCreatorWithDefault = componentCreator('foo', { value: 'default'})
    it('updates entity with default values', ()=>{
        expect(componentCreatorWithDefault())
            .toEqual({foo: {value: 'default'}});
    });
    it('preserves existing entity', ()=>{
        expect(componentCreatorWithDefault({id:2}))
            .toEqual({id: 2, foo: {value: 'default'}});
    });
    it('overrides existing copy of same component', ()=>{
        expect(componentCreatorWithDefault({id:1, foo: {value: 'bar', otherValue: 'shouldDelete' }}))
            .toEqual({id:1, foo: {value: 'default'}});
    })

    describe('with override', ()=>{
        it('preserves defaults', ()=>{
            expect(componentCreatorWithDefault({}, {otherValue: 'provided'}))
                .toEqual({foo: {value: 'default', otherValue: 'provided'}});
        });
        it('overrides when conflicting with default', ()=>{
            expect(componentCreatorWithDefault({}, {value: 'provided'}))
                .toEqual({foo:{value: 'provided'}});
        });
    });
})