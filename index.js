const ipfsUploader = require('./lib/ipfs-uploader');

// const config = require('./config');
// const pluginConfig = config(hexo);

hexo.extend.filter.register('after_generate', async function() {
    const { route } = this;

    try {
        await ipfsUploader.initializeIPFS();

        const routes = route.list();
        hexo.log.info("Surely not")
        const cid = await ipfsUploader.uploadToIPFS("Hi world");
        hexo.log.info(cid)
        for (const path of routes) {
            if (path.endsWith('.html')) {
        //         const content = route.get(path);
        //         const htmlContent = await streamToString(content);
        //
        //         // Upload to IPFS
        //         const cid = await ipfsUploader.uploadToIPFS(htmlContent);
        //
        //         // Update the page's front-matter
        //         const page = hexo.locals.get('pages').find(p => p.path === path) ||
        //             hexo.locals.get('posts').find(p => p.path === path);
        //
        //         if (page) {
        //             page.ipfs = {
        //                 cid: cid,
        //                 timestamp: Date.now(),
        //                 version: (page.ipfs && page.ipfs.version) ? page.ipfs.version + 1 : 1
        //             };
        //         }
        //
        //         hexo.log.info(`Uploaded ${path} to IPFS with CID: ${cid}`);
            }
        }
    } catch (error) {
        hexo.log.error('Error uploading to IPFS:', error);
    }
});


// hexo.extend.helper.register('getIPFSLink', function(page) {
//     if (page.ipfs && page.ipfs.cid) {
//         return `https://ipfs.io/ipfs/${page.ipfs.cid}`;
//     }
//     return '';
// });


function streamToString(stream) {
    return new Promise((resolve, reject) => {
        let content = '';
        stream.on('data', (chunk) => content += chunk);
        stream.on('end', () => resolve(content));
        stream.on('error', reject);
    });
}