const argv = require('yargs').argv;

exports.MONGODB = {
	uri: `mongodb://47.97.102.250:${argv.dbport || '27017'}/NodePress`,
	username: argv.db_username || 'DB_username',
	password: argv.db_password || 'DB_password'
};

exports.QINIU = {
	accessKey: argv.qn_accessKey || 'adcXzTBYWeo6nDFuqXjkxfKoPIG70yMqnnG5RVdG',
	secretKey: argv.qn_secretKey || 'kiQ2sTiGJ4N36GjHEv_uaWl9rYMwT40nMq2qEI73',
	bucket: argv.qn_bucket || 'blog',
	origin: argv.qn_origin || 'http://pgc1r4dla.bkt.clouddn.com',
	uploadURL: argv.qn_uploadURL || 'http://pgc1r4dla.bkt.clouddn.com'
};

exports.CROSS_DOMAIN = {
	allowedOrigins: ['http://www.yyidan.top', "http://127.0.0.1:3000", 'http://yyidan.top', 'http://yyidan.top:4200', 'http://www.yyidan.top:4200', 'http://www.admin.yyidan.top', 'http://admin.yyidan.top', 'http://www.yyidan.top:3000', 'http://www.yyidan.top:8000', 'http://www.blog.yyidan.top'],
	allowedReferer: 'yyidan.top'
}

exports.GITHUB = {
	username: 'maneng',
}

exports.AUTH = {
	data: argv.auth_data || { user: 'root' },
	jwtTokenSecret: argv.auth_key || 'nodepress',
	defaultPassword: argv.auth_default_password || 'root'
};

exports.BAIDU = {
	site: argv.baidu_site || 'your baidu site domain like : surmon.me',
	token: argv.baidu_token || 'your baidu seo push token'
};

exports.ALIYUN = {
	ip: argv.aliyun_ip_auth
};

exports.EMAIL = {
	account: '643449856@qq.com',
	password: 'emqcmpgytpkfbfbc'
};

exports.AKISMET = {
	key: argv.akismet_key || 'your akismet Key',
	blog: argv.akismet_blog || 'http://surmon.me'
};

exports.APP = {
	ROOT_PATH: __dirname,
	LIMIT: 16,
	PORT: 8000
};

exports.INFO = {
	name: 'NodePress',
	version: '2.0.0',
	author: 'Surmon',
	site: 'http://www.yyidan.top',
	github: 'https://github.com/surmon-china',
	powered: ['Vue', 'Nuxt.js', 'ReactNative', 'Angular', 'Bootstrap4', 'Nodejs', 'MongoDB', 'Express', 'Nginx']
};
