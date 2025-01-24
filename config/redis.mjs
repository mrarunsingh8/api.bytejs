import ioredis from 'ioredis';

const redis = new ioredis({
    host: '3.111.53.61',
    port: 6379
});

export default redis;