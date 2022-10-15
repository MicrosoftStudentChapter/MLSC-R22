import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import styles from './quizcard.module.css';
import { useEffect } from 'react';
import Logo from '../../images/img.jpeg'

function QuizCard({ ques, setSelOption, selOption, active, setActive }) {

    const handleChange = (e) => {
        setSelOption(e.target.value)
        setActive(e.target.value)
        ques.selected = e.target.value
    }

    useEffect(() => {
        if (ques.selected !== '') {
            setSelOption(ques.selected)
            setActive(ques.selected)
        }
    }, [])

    return (
        <>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label"
                    sx={{
                        fontSize: '20px',
                        minWidth: '550px',
                        margin: 'auto',
                        height: '40%',
                        textJustify: 'inter-character',
                        color: 'white',
                        wordSpacing: '2px',
                        '&.Mui-focused': {
                            color: 'white',
                        },
                        fontFamily: 'Poppins',
                        fontWeight: 'bold',
                        overflow: 'scroll',
                    }}
                >{ques.question}
                </FormLabel>

                {/* Sample Image */}
                <img style={{
                    width: '80%',
                    margin: 'auto',
                    marginBottom: '3%'
                }}
                    src="https://bobbyhadz.com/images/blog/react-prevent-multiple-button-clicks/thumbnail.webp"
                    alt="car"
                />

                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    onChange={handleChange}
                    defaultChecked={false}
                    value={(ques.selected !== '') ? selOption : ques.selected}
                    sx={{
                        paddingLeft: '10px',
                    }}
                >
                    {ques.options.map(opt => (
                        <FormControlLabel className={opt === active && styles.active} value={opt} control={<Radio />} label={opt} sx={{
                            minWidth: '550px',
                            paddingTop: '10px',
                            border: '1.5px solid white',
                            marginBottom: '10px',
                            borderRadius: '5px',
                            fontFamily: 'Poppins',
                            fontWeight: 'bold',
                        }} />
                    ))}
                </RadioGroup>
            </FormControl>
        </>
    )
}

export default QuizCard;