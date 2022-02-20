import { useClipboard, Button } from '@chakra-ui/react'

export default function Copy({value}) {
    const { hasCopied, onCopy } = useClipboard(value)

    return (
        <Button size = 'lg' variant='outline'  onClick={onCopy}>
          {hasCopied ? 'Copied' : 'Copy'}
        </Button>
    )
}