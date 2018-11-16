import { images, spritesheets } from './assets';
import { update } from './mainLoop';
import systems from './systems';
import * as world from './world';

const DEFAULT_IMAGE_DIMENSIONS = { frameWidth: 32, frameHeight: 32 };

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
        create: ()=>undefined,
        update: function(){
            update(world, systems).apply(this);
        }

    }
});