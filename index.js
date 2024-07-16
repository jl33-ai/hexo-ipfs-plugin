'use strict';

console.error("IPFS Plugin: Module being loaded");

function initIPFSPlugin(hexo) {
    console.error("IPFS Plugin: Initializing");

    hexo.extend.filter.register('after_generate', async function() {
        console.error("IPFS Plugin: after_generate hook triggered");
        try {
            const { create } = await import('helia');
            const { unixfs } = await import('@helia/unixfs');

            const helia = await create();
            const fs = unixfs(helia);

            console.error("IPFS Plugin: IPFS node created successfully");

            // TODO
            // hexo.route.list().forEach(path => { ... });

        } catch (error) {
            console.error('IPFS Plugin Error:', error.message);
        }
    });

    hexo.extend.filter.register('before_post_render', function(data){
        console.error("IPFS Plugin: before_post_render hook triggered for:", data.title);
        return data;
    });

    console.error("IPFS Plugin: Initialization complete");
}

initIPFSPlugin(hexo);

module.exports = initIPFSPlugin;

console.error("IPFS Plugin: Module loaded");