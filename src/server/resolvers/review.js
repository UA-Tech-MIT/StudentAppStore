export default {
    Query: {
        allReviews: async (parents, args, {models}) => {
            models.Reviews.findAll();
        },
        appReviews: async (parents, id, {models}) => {// TODO
            models.Reviews.findAll({
                include: [
                    {
                        model: models.App,
                        where: {id: id}
                    }
                ]
            });
        }
    },
    Mutation: {
        createReview: async (parents, args, {models}) => {// TODO validation
            try {
                models.Review.create({...args});
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
}