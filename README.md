# hexo-ipfs-plugin

A web3 plugin for Hexo to publish your blog posts to Interplanetary File System (IPFS), and manages version history. 

## Installation

View on [npm](https://www.npmjs.com/package/hexo-ipfs)

```bash
npm install hexo-ipfs
```

## Setup

1. Add the following to your Hexo `_config.yml`:

```yaml
plugins:
  - hexo-ipfs
```

Adjust these values according to your IPFS node setup.

2. Ensure you have an IPFS node running and accessible with the configuration you've specified.

## Usage

### Marking Posts for IPFS Upload

To upload a post to IPFS, add `ipfs: true` to the post's front matter:

```yaml
---
title: My IPFS Post
date: 2023-07-17 14:30:00
tags:
ipfs: true
---
```

### Accessing IPFS Links in Templates

The plugin provides two helper functions for use in your EJS templates:

1. `getIPFSLink(page)`: Returns the IPFS link for the latest version of the page.
2. `getLatestIpfsCID(page)`: Returns the CID of the latest version of the page.

Example usage in a template:

```ejs

<article>
    <h1>
        page . title
    </h1>
    <p>View on IPFS: <a href="getIPFSLink ( page )">IPFS Link</a></p>
    <p>Latest CID:
        getLatestIpfsCID ( page )
    </p>
</article>
```

## Version History

The plugin maintains a version history of each uploaded post. The CIDs are stored in the post's front matter under
the `cids` key, with the most recent CID first.

## Important Notes

- Ensure your IPFS node is running before generating your Hexo site.
- The plugin only uploads posts marked with `ipfs: true` in the front matter.
- Each edit to a post creates a new IPFS entry; IPFS content is immutable.

## Troubleshooting

If you encounter issues:

1. Check your IPFS node is running and accessible.
2. Verify the configuration in `_config.yml` matches your IPFS setup.
3. Check Hexo's error logs for any specific error messages.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
