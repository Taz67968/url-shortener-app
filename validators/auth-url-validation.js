import Joi, { custom } from "joi";
import { shortenUrl } from "../controllers/url-controller";


const shortenUrlSchema = Joi.object({
    longUrl: Joi.string().url().required(),
    customCode: Joi.string().alphanum().min(3).max(20).optional(),
    expiresAt: Joi.date().optional(),
    longUrl: Joi.string().optional(),
    customCode: Joi.string.optional(),
})

export function validateShortenRequest(data) {
    const { error } = shortenUrlSchema.validate(data);
    return error ? error.details[0].message : null;
  }
export default shortenUrlSchema