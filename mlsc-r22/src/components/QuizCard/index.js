import React, { useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import styles from './quizcard.module.css';

function QuizCard({ ques, setSelOption, selOption, active, setActive }) {

    const handleChange = (e) => {
        setSelOption(e.target.value)
        setActive(e.target.value)
        ques.selected = e.target.value
    }

    return (
        <>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label"
                    sx={{
                        fontSize: '20px',
                        width: '880px',
                        height: '40vh',
                        textJustify: 'inter-character',
                        color: 'white',
                        wordSpacing: '2px',
                        '&.Mui-focused': {
                            color: 'white',
                        },
                    }}
                >{ques.question}
                </FormLabel>

                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    onChange={handleChange}
                    defaultChecked={false}
                    value={selOption}
                    sx={{
                        paddingLeft: '10px',
                    }}
                >
                    {ques.options.map(opt => (
                        <FormControlLabel className={opt === active && styles.active} value={opt} control={<Radio />} label={opt} sx={{
                            width: '880px',
                            paddingTop: '10px',
                            border: '1px solid white',
                            marginBottom: '10px',
                            borderRadius: '5px',
                        }} />
                    ))}
                </RadioGroup>
            </FormControl>
        </>
    )
}

export default QuizCard;