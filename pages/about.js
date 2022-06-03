import Head from 'next/head'
import useSWR from 'swr';

import { Container, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Image from 'next/image'

import FileUpload from 'components/FileUpload';
import { uploadFile } from 'services/upload';
import { fetcher } from 'services/http';
import Link from 'components/Link';

const url = '/api/search?tags=blue'

export default function Home() {
  const { data, error } = useSWR(url, fetcher)
  const loading = !error && !data

  const onFileChange = async (e) => {
    const response = await uploadFile(e.target.files[0])
    console.log(response)
  }

  const renderContent = () => {
    if (loading) {
      return <p>loading...</p>
    }

    if (error) {
      return <p>error...</p>
    }

    const images = data.data.response.resources;
    // console.log(images)

    return (
      <Box sx={{ mt: 1 }}>
        {images.map(image => (
          <Box key={image.asset_id}>
            <Image
              src={image.url}
              alt={image.filename}
              width={image.width}
              height={image.height}
            />
          </Box>
        ))}
      </Box>
    )
  }

  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <Head>
        <title>NextJS and Cloudinary</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="md">
        <Typography variant='h2'>
          About
        </Typography>

        <Toolbar disableGutters sx={{ gap: 1 }}>
          <Link href='/'>Home</Link>
          <Link href='/masonry'>Masonry</Link>
          <Typography>About</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <FileUpload onFileChange={onFileChange} />
        </Toolbar>

        <Typography gutterBottom>
          This example app uses two NextJS API Routes.
        </Typography>
        <Typography gutterBottom>
          The search route searches cloudinary and returns images with a specified tag.
          This is used to fetch the images displayed below.
        </Typography>
        <Typography gutterBottom>
          The upload route uploads a photo to cloudinary.
          This is used when the Upload button is clicked.
        </Typography>
      </Container>
    </Box>
  )
}
