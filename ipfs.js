'use strict';

const fs = require('fs');
const path = require('path');

function log(message) {
    console.error(message)
}

console.error("ipfs.js loaded");

module.exports = function(hexo) {
    console.error("IPFS Plugin: Function called");
    console.error("IPFS Plugin: Hexo object keys:", Object.keys(hexo));
    console.error("IPFS Plugin: Hexo extend keys:", hexo.extend ? Object.keys(hexo.extend) : "extend not found");

};

// console.error("Here 1")
// module.exports = function(hexo) {
//     console.error("Here 2")
//
//     const config = hexo.config.ipfs_plugin = Object.assign({
//         enabled: true,
//         // TODO
//     }, hexo.config.ipfs_plugin);
//
//     if (!config.enabled) {
//         log('Hexo IPFS plugin is disabled');
//         return;
//     }
//
//     log('Hexo IPFS plugin is enabled');
//
//     hexo.extend.filter.register('after_generate', async function() {
//         console.error("here 3")
//         try {
//             const { create } = await import('helia');
//             const { unixfs } = await import('@helia/unixfs');
//
//             const helia = await create();
//             const fs = unixfs(helia);
//
//             log('Hexo IPFS plugin: IPFS node created successfully');
//
//             // Your IPFS logic here
//         } catch (error) {
//             log('Error in Hexo IPFS plugin: ' + error.message);
//         }
//     });
// };