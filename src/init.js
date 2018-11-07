import config from './config';
import { withPhaser } from './lazyPhaser';

export default withPhaser(Phaser => new Phaser.Game(config(Phaser)));