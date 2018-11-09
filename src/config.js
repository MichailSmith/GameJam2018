import { images, spritesheets } from './assets';

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
        update: ()=>undefined
    }
});