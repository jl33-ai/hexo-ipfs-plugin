'use strict';

function register(hexo) {
    hexo.extend.helper.register('ipfsLink', function(post) {
        if (post.ipfs && post.ipfs.latest) {
            return `https://ipfs.io/ipfs/${post.ipfs.latest}`;
        }
        return '';
    });
}

module.exports = {
    register
};