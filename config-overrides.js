module.exports = config => ({
    ...config,
    node: undefined,
    target: 'electron-renderer',
});