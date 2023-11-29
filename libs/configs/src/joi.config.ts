import * as Joi from 'joi';

export const JoiConfig = () =>
  Joi.object({
    PORT: Joi.number().required(),
    API_HOST: Joi.string().required(),
    NODE_ENV: Joi.string().required(),

    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_DB: Joi.string().required(),
    POSTGRES_URL: Joi.string().required(),

    JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
    JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.number().required(),
    JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
    JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.number().required(),

    S3_ACCESS_KEY: Joi.string().required(),
    S3_SECRET_KEY: Joi.string().required(),
    S3_NESTAWS_REGION: Joi.string().required(),
    S3_BUCKET_NESTAWS: Joi.string().required(),
  });
