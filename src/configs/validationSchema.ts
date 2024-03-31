import * as Joi from 'joi';

export const validationSchema = Joi.object({
  KAKAO_LOGIN_API_KEY: Joi.string().required(),
  KAKAO_REDIRECT_URI: Joi.string().required(),
});
