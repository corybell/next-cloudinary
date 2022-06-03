import NextLink from 'next/link'
import MuiLink from '@mui/material/Link'

export default function Link({ href, children }) {
    return (
        <NextLink href={href} passHref>
            <MuiLink underline='hover' sx={{ cursor: 'pointer' }}>
                {children}
            </MuiLink>
        </NextLink>
    )
}
