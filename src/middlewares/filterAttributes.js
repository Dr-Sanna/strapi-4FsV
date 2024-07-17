module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    await next();

    if (ctx.response && ctx.response.body && ctx.response.body.data) {
      const data = ctx.response.body.data;
      
      const filterAttributes = (item) => {
        if (item.attributes) {
          delete item.attributes.createdAt;
          delete item.attributes.updatedAt;
          delete item.attributes.publishedAt;
        }
        return item;
      };

      if (Array.isArray(data)) {
        ctx.response.body.data = data.map(filterAttributes);
      } else {
        ctx.response.body.data = filterAttributes(data);
      }
    }
  };
};
