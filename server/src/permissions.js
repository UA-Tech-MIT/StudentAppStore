const createResolver = (resolver) => {
    const baseResolver = resolver;
    baseResolver.createResolver = (childResolver) => {
      const newResolver = async (parent, args, context, info) => {
        await resolver(parent, args, context, info);
        return childResolver(parent, args, context, info);
      };
      return createResolver(newResolver);
    };
    return baseResolver;
  };
  
  // check context for authenticated user
  export default createResolver((parent, args, { user, devMode }) => {
    if(devMode) return;
    else if (!user || !user.id) {
      throw new Error('Not authenticated');
    }
  }); 