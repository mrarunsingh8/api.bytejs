import ioredis from 'ioredis';

const redis = new ioredis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
});

export default redis;