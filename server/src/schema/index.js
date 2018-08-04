import { typeDef as appSchema } from './app';
import { typeDef as reviewSchema } from './review';
import { typeDef as teamSchema } from './team';
import { typeDef as userSchema } from './user';
import { typeDef as itemTagSchema } from './itemTag';
import { typeDef as tagSchema } from './tag';
import { typeDef as querySchema } from './query';
import { typeDef as mutationSchema } from './mutation';
import { typeDef as errorSchema } from './error';

export const schemaArray = [
    querySchema, 
    mutationSchema, 
    appSchema, 
    reviewSchema, 
    teamSchema, 
    userSchema, 
    itemTagSchema, 
    tagSchema,
    errorSchema
];