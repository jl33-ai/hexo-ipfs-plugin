'use strict'

const minimatch = require('minimatch');

const DEFAULT_CONFIG = {
    ipfs: {
        host: 'localhost',
        port: 5001,
        protocol: 'http',
        timeout: 10000,
    },
    gateway: 'https://ipfs.io/ipfs/',
    updateExisting: true,
    includeFiles: ['**/*.html'],
    excludeFiles: [],
};

module.exports = function(hexo) {
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

    // Map include/excludes to RegExp
    mergedConfig.shouldInclude = (file) => {
        return mergedConfig.includeFiles.some(pattern => minimatch(file, pattern)) &&
            !mergedConfig.excludeFiles.some(pattern => minimatch(file, pattern));
    };

    return mergedConfig;
};