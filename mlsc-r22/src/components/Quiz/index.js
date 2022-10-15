import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import QuizCard from '../QuizCard/index';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './quiz.module.css';
import Quiz_Timer from '../Quiz_Timer';

const Questions = [{
  question: 'Question 1: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam officia autem at deleniti quod culpa repudiandae explicabo eius atque, sit, odit, corporis nesciunt voluptatum consectetur sapiente harum voluptas qui sint quas numquam? Eum officia error corporis dignissimos molestiae impedit quo! ',
  options: ['1', '2', '3', '4'],
  selected: ''
},
{
  question: 'Question 2: Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta fugiat necessitatibus nostrum suscipit quasi quo.',
  options: ['1', '2', '3', '4'],
  selected: ''
},
{
  question: 'Question 3: Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, expedita? Vel quae eos omnis ut hic vitae perferendis assumenda quos eius non! Id, mollitia autem.',
  options: ['1', '2', '3', '4'],
  selected: ''
},
{
  question: 'Question 4: Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio excepturi velit consequuntur laborum cupiditate, iure ut, corporis iusto facere natus consectetur. Quod dolores repellendus fuga quasi eius alias dolorum facere. Ullam, deleniti et reprehenderit itaque debitis consequuntur eum sed similique! Voluptatem, esse? Dolorum, doloremque! Tempore dolores vero autem illum accusamus, illo perferendis ad itaque assumenda non atque laudantium ratione quas! Vel nostrum alias quos minima in similique molestiae, dolorem ratione rem eaque eius atque adipisci labore pariatur culpa dolorum debitis perspiciatis mollitia odit eum rerum magnam, tenetur quia dolor? Odio, tempora sunt perspiciatis asperiores error dolore sed nihil quas rem.',
  options: ['1', '2', '3', '4'],
  selected: ''
}]

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [prevBtnState, setPrevBtnState] = useState('contained');
  const [nextBtnState, setNextBtnState] = useState('contained');

  const [selOption, setSelOption] = useState('');
  const [active, setActive] = useState('');

  const nextIndex = () => {
    setPrevBtnState('contained');
    setNextBtnState('contained');

    if (index < Questions.length - 1) {
      setSelOption(Questions[index + 1].selected.length !== 0 ? Questions[index + 1].selected : '');
      setIndex(index + 1);
      setActive(selOption);
    }
    else if (index === Questions.length - 1) {
      setNextBtnState('disabled');
    }
  }

  const prevIndex = () => {
    setPrevBtnState('contained');
    setNextBtnState('contained');

    if (index > 0) {
      setSelOption(Questions[index - 1].selected.length !== 0 ? Questions[index - 1].selected : '')
      setIndex(index - 1);
      setActive(selOption);
    }
    else {
      setPrevBtnState('disabled');
    }
  }

  return (
    <>
      <Quiz_Timer />
      <CssBaseline />
      <Container fixed>
        <Box sx={{
          bgcolor: '#14213d',
          height: '85vh',
          color: 'white',
          width: '920px',
          margin: 'auto',
          position: 'relative',
          padding: '20px',
          borderBottomLeftRadius: '20px',
          borderBottomRightRadius: '20px',
        }}
          className='quiz__container' >

          <QuizCard ques={Questions[index]} setSelOption={setSelOption} selOption={selOption} active={active} setActive={setActive} />
          <Button variant={prevBtnState} size="medium" className='prev__button' onClick={prevIndex} sx={{
            position: 'absolute',
            bottom: '30px',
            left: '30px',
            width: '100px',
            color: 'white',
            opacity: '.8',
            ":hover": {
              opacity: '1'
            },
            ":disabled": {
              border: '1px solid white'
            }
          }}>Previous</Button>

          <Button variant={nextBtnState} size="medium" className='next__button' onClick={nextIndex} sx={{
            position: 'absolute',
            bottom: '30px',
            right: '30px',
            width: '90px',
          }}>Next</Button>
        </Box>
      </Container>
    </>
  );
}

export default Quiz