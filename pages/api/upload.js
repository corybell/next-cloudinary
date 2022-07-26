import nextConnect from 'next-connect';
import multer from 'multer';
import FormData from 'form-data';
import fetch from 'isomorphic-fetch'
// const cloudinary = require('cloudinary').v2

// cloudinary.config({
//     cloud_name: 'drayfpulc',
//     api_key: '483296116259727',
//     api_secret: 'S9xSexZBch_fk1_-JlLj3R854FQ'
// });

const url = 'https://api.cloudinary.com/v1_1/caringbridge/image/upload'

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array('theFiles'));

apiRoute.post((req, res) => {
  console.log(req.files)
  const file = req.files[0]
//   const formData = new FormData()
  const formData = new URLSearchParams(); 
  formData.append('file', file)
  formData.append('upload_preset', 'pzjsnmyn')

  fetch(url, {
    method: 'post',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  .then((response) =>{
      return response.json()
  })
  .then((json) => {
    console.log(json)
    res.status(200).json({ data: 'success' });
  })


//   const options = {}
//   cloudinary.uploader.upload(file, options, (error, result) => {
//     console.log(result, error)
//     res.status(200).json({ data: 'success' });
//   });
//   cloudinary.utils.api_sign_request()
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
