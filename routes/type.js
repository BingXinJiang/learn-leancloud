const router = require('koa-router')()
const AV = require('leancloud-storage');

router.prefix('/type');

router.post('/', async (ctx, next) => {
  const { body } = ctx.request;
  const TestObject = AV.Object.extend('DataTypeTest');
  const testObject = new TestObject();

  const body2 = {
    ...body,
    date: new Date(body.date),
  }

  Object.keys(body2).forEach((key) => {
    testObject.set(key, body[key]);
  });

  await testObject.save().then((testObject) => {
    ctx.body = testObject;
  }, (error) => {
    ctx.body = error;
  });

});

router.patch('/', async (ctx, next) => {

  let result = {
    todoFolder: null,
    dataTypeTest: null,
  };

  await AV.Query.doCloudQuery('insert into TodoFolder(name, priority) values("工作", 1)').then((data) => {
    result.todoFolder = data.results;
  }, (error) => {
    result.todoFolder = error;
  });

  await AV.Query.doCloudQuery('insert into DataTypeTest(name, priority) values("工作", 1)').then((data) => {
    result.dataTypeTest = data.results;
  }, (error) => {
    result.dataTypeTest = error;
  });

  ctx.body = result;

});

router.get('/:id', async (ctx, next) => {
  const { url } = ctx.request;
  const id = url.split('/')[url.split('/').length-1];
  const query = new AV.Query('DataTypeTest');
  await query.get(id).then((type) => {
    ctx.body = type.toJSON();
  }, (error) => {
    ctx.body = error;
  });
});

module.exports = router;
