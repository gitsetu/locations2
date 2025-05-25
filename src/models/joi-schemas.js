import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const PlaceSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Piano Sonata No. 7"),
    category: Joi.string().required().example("Cafe"),
    latitude: Joi.number().allow("").optional().example(12),
    collectionid: IdSpec,
  })
  .label("Place");

export const PlaceSpecPlus = PlaceSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlacePlus");

export const PlaceArraySpec = Joi.array().items(PlaceSpecPlus).label("PlaceArray");

export const CollectionSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Cafe Town"),
    userid: IdSpec,
    places: PlaceArraySpec,
  })
  .label("Collection");

export const CollectionSpecPlus = CollectionSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("CollectionPlus");

export const CollectionArraySpec = Joi.array().items(CollectionSpecPlus).label("CollectionArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");
