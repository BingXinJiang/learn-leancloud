const router = require('koa-router')()
const AV = require('leancloud-storage');

router.prefix('/todo')

/** 创建一个todo */
router.post('/', async (ctx, next) => {
  const { body } = ctx.request;

  // 声明类型
  const Todo = AV.Object.extend('Todo');
  let todo = new Todo();
  
  Object.keys(body).forEach((key) => {
    todo.set(key, body[key]);
  });

  await todo.save().then((todo) => {
    ctx.body = todo;
  }, (error) => {
    ctx.body = error;
  });
});
/** 属性添加 */
router.put('/', async (ctx, next) => {
  const { body } = ctx.request;
  
})

module.exports = router;