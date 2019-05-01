require('@babel/register')

const [example] = process.argv.slice(2);

require(`./examples/${example || 'usage'}`);
