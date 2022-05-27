const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'drayfpulc',
    api_key: '483296116259727',
    api_secret: 'S9xSexZBch_fk1_-JlLj3R854FQ'
});

export default async function handler(req, res) {
  const tags = req.query?.tags || ''

  const response = await cloudinary.search
    .expression(`resource_type:image AND tags=${tags}`)
    .execute()

  res.status(200).json({ response })
}
  