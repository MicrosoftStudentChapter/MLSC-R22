import * as React from 'react';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import Lottie from "lottie-react";
import Animation from "./assets/animation.json";
import Live from "./assets/live.json"

import bg from "./assets/bg.png"

import { Backdrop, Container } from '@mui/material';

import styles from './waiting.module.css';
import { Link } from 'react-router-dom';
import Waiting_Timer from '../Waiting_Timer';
import { Quiz } from '../Quiz/index';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  border: '1px solid',
  // padding: '0px',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(0.5),
  borderRadius: '20px',
  textAlign: 'center',
}));

const Waiting = () => {
 

  return (
    <>
      <ThemeProvider theme={darkTheme}>
      
        <div className={styles.wrapper} >
        
        
          <Grid container spacing={2}>
              <Grid item xs={6}>
                  <Item sx={{
                  //  width:'50vw',
                    // height: '97.22vh',
                    
                    // background: 'rgba(255, 255, 255, .7)',
                  
                    
                    }}>
                        
                      <img src={bg} loading="lazy" alt="bg_img" />
                      <div className={styles.glass}>
                        <Waiting_Timer/>
                      </div>
                        
                      
                  </Item>
              </Grid>
      
              <Grid sx={{
                width:'50vw',
                height: '100vh',
              }} item xs={6}>
                  <Item sx={{
                    width:'48vw',
                    height: '97.22vh',
                    
                  }}>
                    <Container maxWidth="sm">
                      <Lottie animationData={Animation} style={{
                        width:'20rem',
                        marginLeft:'9vw',
                        position:'relative'
                      }} />
                    </Container>
                    <h5 style={{
                      fontFamily:'Nunito',
                      color:'#fff',
                      letterSpacing:'8px'
                    }}>ALL THE BEST</h5>

                    

                    <h1 style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      color:'#fff',
                      letterSpacing:'1px',
                      fontSize:'2.5rem'
                    }}>We Will Start Very Soon</h1>

                    
                    
                    <br/>
                    <Link to="/quiz" style={{ textDecoration: 'none' ,fontFamily:'Nunito' }}>
                      <Button variant="contained" endIcon={<SendIcon />}>
    
                        Let's Roll
                        
                      </Button>
                    </Link>

                    {/* <div className={styles.live}>

                      <h5 style={{
                        fontFamily:'Cormorant Garamond, roberto',
                        color:'#fff',
                        // letterSpacing:'8px'
                      }}>Students live - 469
                      </h5>

                        
                      <Lottie animationData={Live} style={{
                          width:'8rem',
                          marginLeft:'10vw'
                        }} />
                    
                    </div> */}

                    {/* <Button variant="contained" disabled>
                      Disabled
                    </Button> */}


                  </Item>
              </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    </>
  )
}

export default Waiting