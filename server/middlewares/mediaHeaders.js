export const setMediaHeaders = (req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff")
  res.setHeader("Access-Control-Allow-Origin", "https://wwpsp.vercel.app")
  res.setHeader("Cache-Control", "public, max-age=86400") // 24 horas
  next()
})
