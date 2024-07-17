'use strict'

const DEFAULT_CONFIG = {
    ipfs: {
        host: 'localhost',
        port: 5001,
        protocol: 'http',
        timeout: 10000,
    },
    gateway: 'https://ipfs.io/ipfs/'
};

module.exports = function (hexo) {
    const userConfig = hexo.config.ipfs || {};

    const mergedConfig = {
        ...DEFAULT_CONFIG,
        ...userConfig,
        ipfs: {
            ...DEFAULT_CONFIG.ipfs,
            ...userConfig.ipfs,
        },
    };

    if (!mergedConfig.ipfs.host) {
        throw new Error('IPFS host is not configured');
    }

    return mergedConfig;
};