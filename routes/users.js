const router = require('koa-router')()
const AV = require('leancloud-storage');

const { Query, User } = AV;

router.prefix('/user')

/**用户注册 */
router.get('/register', async (ctx, next) => {
  const username = 'Jason3';
  const password = 'jiangsong1234@';
  const email = 'Jason3@163.com';
  const user = new User();

  user.setUsername(username);
  user.setPassword(password);
  user.setEmail(email);

  await user.signUp().then((loginedUser) => {
    ctx.body = loginedUser;
  }, (error) => {
    ctx.body = error;
  });
});

/**用户登录 */
router.get('/login', async (ctx, next) => {
  const username = 'Jason3';
  const password = 'jiangsong1234@';

  await User.logIn(username, password).then((loginedUser) => {
    ctx.body = loginedUser;
  }, (error) => {
    ctx.body = error;
  })
});

/**发布商品 */
router.get('/push/good', async (ctx, next) => {
  const Product = AV.Object.extend('Product');

  const title = 'Lovely good2!';
  const price = 129.32;
  const description = 'This is my second good, and do you like it ?';
  const currentUser = User.current();

  const product = new Product();
  product.set('title', title);
  product.set('price', price);
  product.set('description', description);
  product.set('owner', currentUser);

  await product.save().then((good) => {
    ctx.body = good;
  }, (error) => {
    ctx.body = error;
  });
});

/**查询商品 */
router.get('/goods', async (ctx, next) => {
  const query = new Query('Product');
  query.include('title');
  query.include('price');
  query.include('description');
  query.include('owner');
  query.descending('createdAt');

  await query.find().then((goods) => {
    ctx.body = goods;
  }, (error) => {
    ctx.body = error;
  })
});

/**退出登录 */
router.get('/logout', async (ctx, next) => {
  await User.logOut();
  ctx.body = '用户退出！';
});



module.exports = router
