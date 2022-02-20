import { useRouter } from 'next/router'
import { AiFillHome } from "react-icons/ai";
import { IconButton } from '@chakra-ui/react'

export default function GoHome() {
    const router = useRouter()
    
    function push() {
        router.push('/')
    }
    return (
        <IconButton aria-label='push' size='md'  variant='outline' icon={<AiFillHome />} onClick={() => push()}/>
    )
}