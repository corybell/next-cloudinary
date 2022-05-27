import { styled } from '@mui/material/styles';

import { Button } from '@mui/material'

const Input = styled('input')({
    display: 'none',
});

export default function FileUpload({ onFileChange }) {
    return (
        <label htmlFor="contained-button-file">
            <Input onChange={onFileChange} accept="image/*" id="contained-button-file" multiple type="file" name="theFiles" />
            <Button variant="contained" component="span">
                Upload
            </Button>
        </label>
    )
}
