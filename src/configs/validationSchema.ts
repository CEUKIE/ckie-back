import * as Joi from 'joi';

export const validationSchema = Joi.object({
  KAKAO_LOGIN_API_KEY: Joi.string().required(),
  KAKAO_REDIRECT_URI: Joi.string().required(),
  KAKAO_USER_DATA_URL: Joi.string().required(),
  KAKAO_TOKEN_URL: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET_KEY: Joi.string().required(),
  JWT_TOKEN_EXPIRATION_TIME: Joi.string().required(),
});
