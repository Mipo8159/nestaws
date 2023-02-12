import * as Joi from 'joi';

export const JoiConfig = () =>
  Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .required(),
    PORT: Joi.number().required(),
    POSTGRES_TYPE: Joi.string().valid('mysql', 'postgres').required(),
    POSTGRES_HOST: Joi.string().default('localhost'),
    POSTGRES_PORT: Joi.number().required(),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_DB: Joi.string().required(),
    JWT_ACCESS_SECRET: Joi.string().required(),
    JWT_ACCESS_EXPIRE: Joi.string().required(),
    JWT_REFRESH_SECRET: Joi.string().required(),
    JWT_REFRESH_EXPIRE: Joi.string().required(),
    S3_BUCKET: Joi.string().required(),
    S3_REGION: Joi.string().required(),
    AWS_ACCESS: Joi.string().required(),
    AWS_SECRET: Joi.string().required(),
  });
