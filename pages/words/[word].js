import React from 'react';
import styles from '../../styles/Home.module.css'
import { Heading } from '@chakra-ui/react'
import { Box, Button, HStack } from '@chakra-ui/react'
import textUpper from '../../components/upper';
import Copy from '../../components/copy';
import Home from '../../components/Home';
const axios = require('axios');

export default class Word extends React.Component {

    state = {
        isLoading: true,
        example : [],
        synonyms : [],
    };

    static getInitialProps({query}) {
        return {query}
    }

    getExample = async () => {
        const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.props.query.word}`)
            .then(res => res.data[0].meanings)
            .catch(function (error) {
                return console.error(error)
            })

        let example = []
        
        for (const property in res) {
            for (const sentence in res[property].definitions) {
                if (res[property].definitions[sentence].example) {
                    example.push(res[property].definitions[sentence].example)
                }
            }
                
        }
        
        this.setState({example})
      };

      getSynonyms = async () => {
        const res = await axios.get(`https://words.bighugelabs.com/api/2/${process.env.NEXT_PUBLIC_SYNONYM_API_KEY}/${this.props.query.word}/json`)
            .then(res => res.data)
            .catch(function (error) {
                return console.error(error)
            })

        let synonyms = []

        for (const property in res) {
            console.log(property)
            for (const syn in res[property].syn) {
                synonyms.push(res[property].syn[syn])
            }
        }

        this.setState({synonyms, isLoading : false})
      }

    componentDidMount() {
        this.getExample();
        this.getSynonyms();
    }

    render() {
        const {isLoading, example, synonyms} = this.state;
        const copyText = [ textUpper(this.props.query.word), `Sentence : ${example[0]}`, `Synonyms : ${synonyms.slice(0, 4).join(', ')}` ].join('\n') 
        return (
                <>
                    {isLoading ? (
                            <main className={styles.main}>
                                <Button
                                    isLoading
                                    loadingText='Loading'
                                    size = 'lg'
                                    variant='outline'
                                    spinnerPlacement='start'
                                />
                            </main>
                        ) :(
                            <>
                                <main className={styles.main}>
                                    <Box width = {'80%'} justify="left"  color = 'black'>
                                        <HStack>
                                            <Heading as = 'h1' size = '4xl' mb = {5}>{textUpper(this.props.query.word)}</Heading>
                                            <Copy value = {copyText}/>
                                            <Home/>
                                        </HStack>
                                    </Box>
                                    <Box width = {'80%'} justify="left" color = 'black' m = {5}>
                                        <Heading mb = {3} as = 'h1' size = '2xl'>
                                            Sentence.
                                        </Heading>
                                        <Box justify="left" p = {5} backgroundColor = "blue" borderRadius={'2xl'} color = 'white'>
                                            {example.map((exampleSentence) => (<Heading as = 'h1' size = 'xl'>{exampleSentence}</Heading>))}
                                        </Box>
                                    </Box>
                                    <Box width = {'80%'} justify="left" color = 'black'>
                                        <Heading mb = {3} as = 'h1' size = '2xl'>
                                            Synonyms.
                                        </Heading>
                                        <Box justify="left" p = {5} backgroundColor = "blue" borderRadius={'2xl'} color = 'white'>
                                            <Heading as = 'h1' size = 'xl'>
                                                {synonyms.join(', ')}
                                            </Heading>
                                        </Box>
                                    </Box>
                                </main>
                                <footer className={styles.footer}>
                                    <a
                                    href="https://github.com/rnaudah"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    >
                                    Made by{' '}Rnaudah
                                    </a>
                                </footer>
                            </>
                        )
                    }
                </>
        )

    }
}