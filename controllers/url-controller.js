import { nanoid } from "nanoid";
import pool from ('../config/db.js')
const {BASE_URL} = process.env


export const shortenUrl = async (req,res, next) => {
    const {longUrl, customCode, expiresAt} = req.body
    const userId = req.user.id
    const code = customCode || nanoid(6)
    try {
        const exists = await pool.query ('SELECT * FROM urls WHERE short_code = $1', [code])
        if (exists.row.length > 0 ) return res.status(409).json({error:'Custom code already exists'})

            const result= await pool.query('INSERT INTO urls (user_id, short_code, long_urls, expires_at, created_at, clicks) VALUES ($1, $2, $3, $4, NOW(), 0 ) RETURNING *', [userId,code, longUrl, expiresAt || null]) 
            res.status(201).json({shortCode: result.rows[0].short_code, shortUrl: `${BASE_URL}/S/${result.rows[0].short_code}`})
    } catch (err) {
        next(err)
    }
}

export const getMyUrls = async( req, res, next) => {
    try {
        const result = await pool.query(
            'SELECT short_code, long_url, created_at, expires_at, clicks FROM urls WHERE user_id = $1 ORDER BY created_at DESc',
            [req.user.id]
        )
        res.json(result.rows)
    } catch (err) {
        next(err)
    }
}