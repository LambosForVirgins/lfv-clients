module.exports = {
    // Type check TypeScript files
    '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
}