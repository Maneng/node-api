/**
 * Redis module.
 * @file Redis 模块
 * @module core/redis
 * @author Surmon <https://github.com/surmon-china>
 */

const redis = require('redis')
const consola = require('consola')
const { isString } = require('np-helper/np-data-validate')

const memoryClient = {}
let redisAvailable = false
let redisClient = null

const connectRedis = () => {

	redisClient = redis.createClient({ host: '47.97.102.250', port: 6379 });
	exports.redis = redis.createClient({ host: '47.97.102.250', port: 6379 });

	redisClient.on('error', err => {
		redisAvailable = false
		consola.warn('Redis连接失败！', err)
	})

	redisClient.on('ready', _ => {
		redisAvailable = true
		consola.ready('Redis已准备好！')
	})

	redisClient.on('reconnecting', _ => {
		consola.info('Redis正在重连！')
	})

	return redisClient
}

const hommizationSet = (key, value, callback) => {
	if (redisAvailable) {
		if (!isString(value)) {
			try {
				value = JSON.stringify(value)
			} catch (err) {
				value = value.toString()
			}
		}
		redisClient.set(key, value, callback)
	} else {
		memoryClient[key] = value
	}
	return true
}

const hommizationGet = (key, callback) => {
	if (redisAvailable) {
		redisClient.get(key, (err, value) => {
			try {
				value = JSON.parse(value)
			} catch (error) {
				// value = value
			}
			callback(err, value)
			return value
		})
	} else {
		callback(null, memoryClient[key])
		return memoryClient[key]
	}
}

exports.redis = redisClient
exports.set = hommizationSet
exports.get = hommizationGet
exports.connect = connectRedis
