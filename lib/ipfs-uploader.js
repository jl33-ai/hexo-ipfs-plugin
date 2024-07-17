'use strict';

let helia;
let unixfs;

async function loadDependencies() {
    if (!helia) {
        const {createHelia} = await import('helia');
        const {unixfs: unixfsModule} = await import('@helia/unixfs');
        helia = createHelia;
        unixfs = unixfsModule;
    }
}

let ipfs;
let fs;

module.exports = {
    async initializeIPFS(config) {
        await loadDependencies();

        ipfs = await helia({
            // TODO CONFIG
        });

        fs = unixfs(ipfs);
    },

    async uploadToIPFS(content) {
        if (!ipfs || !fs) {
            throw new Error('IPFS not initialized. Call initializeIPFS first.');
        }

        const encoder = new TextEncoder();
        const bytes = encoder.encode(content);

        const cid = await fs.addFile({content: bytes});
        return cid.toString();
    }
};