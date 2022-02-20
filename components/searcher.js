import { useRouter } from 'next/router'
import React from "react";
import { Input } from '@chakra-ui/react'
import { Box, IconButton, HStack } from '@chakra-ui/react'
import { GoSearch } from "react-icons/go";

export default function Searcher({placeholder}) {
    const router = useRouter()
    const [value, setValue] = React.useState('')
    const handleChange = (event) => setValue(event.target.value)
    function wordSearch() {
      router.replace(`/words/${value}`)
    }
    const onKeyPress = (e) => {
      if (e.key === 'Enter') {
        return wordSearch()
      }
    }

    return (
        <HStack justify = 'center'>
          <Box w='100%' p={4} color='black'>
            <Input 
              placeholder={placeholder}
              size='lg' 
              value={value}
              onChange={handleChange}
              onKeyPress = {onKeyPress}
            />
          </Box>
          <IconButton aria-label='Search database' size='lg'  variant='outline' icon={<GoSearch />} onClick={() => wordSearch()}/>
        </HStack>
    )
}