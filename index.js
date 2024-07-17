const ipfsUploader = require('./lib/ipfs-uploader');
const config = require('./lib/config');
const {streamToString} = require('./lib/helpers');
const fs = require('fs');

const pluginConfig = config(hexo);

hexo.extend.filter.register('after_generate', async function () {
    const {route} = this;

    try {
        await ipfsUploader.initializeIPFS(pluginConfig);
        const posts = hexo.locals.get('posts');

        for (const post of posts.data) {
            if (post && post.ipfs === true) {
                const postPath = post.path;
                hexo.log.info(`Attempting to upload ${postPath}`)
                const htmlPath = postPath.replace(/\.md$/, '.html');
                const htmlContent = await getRouteContent(route, htmlPath);

                if (htmlContent) {
                    const cid = await ipfsUploader.uploadToIPFS(htmlContent);

                    if (!post.cids) {
                        post.cids = [];
                    }
                    post.cids.unshift(cid);

                    const sourceFilePath = post.full_source;
                    let postContent = fs.readFileSync(sourceFilePath, 'utf8');
                    const cidsRegex = /cids:(\s*- .*$)*/m;
                    const newCidsSection = `cids:\n  - ${cid}${post.cids.slice(1).map(c => `\n  - ${c}`).join('')}`;

                    if (cidsRegex.test(postContent)) {
                        postContent = postContent.replace(cidsRegex, newCidsSection);
                    } else {
                        const frontMatterEnd = postContent.indexOf('---', postContent.indexOf('---') + 1);
                        postContent = postContent.slice(0, frontMatterEnd) + `${newCidsSection}\n` + postContent.slice(frontMatterEnd);
                    }
                    fs.writeFileSync(sourceFilePath, postContent);

                    hexo.log.info(`Uploaded ${post.title} to IPFS with CID: ${cid}`);
                } else {
                    hexo.log.warn(`Could not find HTML content for post: ${post.title}`);
                }
            }
        }
    } catch (error) {
        hexo.log.error('Error uploading to IPFS:', error);
    }
});

async function getRouteContent(route, path) {
    return new Promise((resolve, reject) => {
        const stream = route.get(path);
        if (!stream) {
            resolve(null);
            return;
        }
        let content = '';
        stream.on('data', chunk => (content += chunk));
        stream.on('end', () => resolve(content));
        stream.on('error', reject);
    });
}

hexo.extend.helper.register('getLatestIpfsCID', function (page) {
    if (page.cids && page.cids.length > 0) {
        return page.cids[0];
    }
    return null
})

hexo.extend.helper.register('getIpfsLink', function (page) {
    if (page.ipfs && page.ipfs.cid) {
        return `https://ipfs.io/ipfs/${page.ipfs.cid}`;
    }
    return '';
});


