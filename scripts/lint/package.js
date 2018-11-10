const { expect, assert, should, use } = require('chai');
const glob = require('glob');
const path = require('path');
const PackageJson = require('../../package.json');

should();

// /package.json检查
describe('package.json', () => {
  // 在/package.json中定义dependencies会导致跨服务的依赖, 应该去掉
  it('no cross dependencies', () => {
    const crossDeps = PackageJson.dependencies || {};
    Object.keys(crossDeps).length.should.equal(0);
  });
});

// service pageage.json检查
describe('package.json in services', () => {
  const services = glob.sync('service-*');
  services.forEach((service) => {
    const servicePath = path.resolve(process.cwd(), service);
    let packageJson = null;
    try {
      packageJson = require(path.resolve(servicePath, 'package.json'));
    } catch (e) {
      packageJson = null;
    }

    describe(service, () => {
      it('has valid package.json', () => {
        expect(packageJson).be.a('object');
      });
      if (packageJson && typeof packageJson === 'object') {

        it('currect service name', () => {
          packageJson.should.have.property('name').equal(service);
        });
      }
    });
  });
});
