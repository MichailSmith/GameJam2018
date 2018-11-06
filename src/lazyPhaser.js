export const phaserPromise = import('phaser');

export const withPhaser = callback => phaserPromise.then(callback);