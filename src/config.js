import { images, spritesheets } from './assets';
import { update } from './mainLoop';
import systems from './systems';
import * as world from './world';
import initialWorld from './initialWorld';

const DEFAULT_IMAGE_DIMENSIONS = { frameWidth: 32, frameHeight: 32 };
const updateFn = update(world, systems);
export default Phaser => ({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: function(){
            const self = this;
            images.forEach(({name, path })=>self.load.image(name, path))
            spritesheets.forEach(({name, path, dimensions}) => 
                self.load.spritesheet(name, path, {...DEFAULT_IMAGE_DIMENSIONS, ...dimensions}));
        },
        create: function(){
            world.resetWorld(initialWorld);
            updateFn.apply(this);
        },
        update: function(){
            updateFn.apply(this);
        }

    }
});