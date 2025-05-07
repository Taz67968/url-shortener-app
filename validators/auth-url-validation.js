import Joi from "joi";


const shortenUrlSchema = Joi.object({
    longUrl: Joi.string().uri().required(),
    customCode: Joi.string().alphanum().min(3).max(20).optional(),
    expiresAt: Joi.date().optional()
})

export function validateShortenRequest(data) {
    const { error } = shortenUrlSchema.validate(data);
    return error ? error.details[0].message : null;
  }
export default shortenUrlSchema