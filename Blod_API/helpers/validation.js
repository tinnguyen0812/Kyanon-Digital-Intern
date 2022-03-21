const Joi = require("@hapi/joi");

const regisValidate = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required(),
    registeredAt: Joi.string().required(),
  });
  return (validation = schema.validate(data));
};

const loginValidate = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required(),
  });
  return (validation = schema.validate(data));
};
const postValidate = (data) => {
  const schema = Joi.object({
    authorId: Joi.number().max(20).required(),
    title: Joi.string().max(75).required(),
    slug: Joi.string().max(100).required(),
  });
  return (validation = schema.validate(data));
};
const categoryValidate = (data) => {
  const schema = Joi.object({
    parentId: Joi.number().max(20),
    title: Joi.string().max(75),
    slug: Joi.string().max(100).default(""),
    metaTitle: Joi.string().max(100),
  });
  return (validation = schema.validate(data));
};
module.exports = {
  regisValidate,
  loginValidate,
  postValidate,
  categoryValidate,
};
