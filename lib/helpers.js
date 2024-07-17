'use strict'

module.exports = {
    streamToString(stream) {
        return new Promise((resolve, reject) => {
            let content = '';
            stream.on('data', (chunk) => content += chunk);
            stream.on('end', () => resolve(content));
            stream.on('error', reject);
        });
    },
    async getRouteContent(route, path) {
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
}