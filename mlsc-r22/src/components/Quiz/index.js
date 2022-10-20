import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import QuizCard from "../QuizCard/index";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./quiz.module.css";
import Quiz_Timer from "../Quiz_Timer";
import { useCookies } from "react-cookie";
import { CircularProgress, Alert } from "@mui/joy";
import { Snackbar } from "@mui/material";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [prevBtnState, setPrevBtnState] = useState("contained");
  const [nextBtnState, setNextBtnState] = useState("contained");
  const [selOption, setSelOption] = useState("");
  const [active, setActive] = useState("");
  const [loading, setLoading] = useState(true);

  const [subNow, setSubNow] = useState(false);
  const [autoSub, setAutoSub] = useState(false);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [questions, setQuestions] = useState([]);
  // const [questions, setQuestions] = useState([
  //   { question: "Loading", options: [1, 2, 3, 4], link: "" },
  // ]);

  const [cookie, setCookie] = useCookies(["session"]);
  useEffect(() => {
    setActive(selOption);
  }, [selOption]);

  useEffect(() => {
    try {
      (async () => {
        const res = await fetch(
          "https://us-central1-mlsc-recruitment-register.cloudfunctions.net/quiz/questions/7",
          {
            method: "GET",
            redirect: "follow",
          }
        );
        if (!res.ok) {
          const message = `An error has occured: ${res.status}`;
          setError(true);
          throw new Error(message);
        } else {
          const data = await res.json();
          // setQuestions(data.data);
          setLoading(false);
          if (
            localStorage.getItem("questionData") === null ||
            localStorage.getItem("questionData") === undefined
          ) {
            setQuestions(() => {
              localStorage.setItem("questionData", JSON.stringify(data.data));
              return data.data;
            });
          } else {
            const vals = JSON.parse(localStorage.getItem("questionData"));
            setQuestions(vals);
            console.log(questions);
          }
        }
      })();
    } catch (err) {
      console.log(err);
      setError(true);
    }
  }, []);

  const nextIndex = () => {
    setPrevBtnState("contained");
    setNextBtnState("contained");
    setSubNow(false);
    localStorage.setItem("questionData", JSON.stringify(questions));
    if (index < questions.length - 1) {
      setSelOption(
        questions[index + 1].selected !== "" ||
          questions[index - 1].selected !== undefined
          ? questions[index + 1].selected
          : ""
      );
      setIndex(index + 1);
    } else if (index === questions.length - 1) {
      setSubNow(true);
      setNextBtnState("disabled");
    }
  };

  const prevIndex = () => {
    setPrevBtnState("contained");
    setNextBtnState("contained");
    setSubNow(false);

    if (index > 0) {
      setSelOption(
        questions[index - 1].selected !== "" ||
          questions[index - 1].selected !== undefined
          ? questions[index - 1].selected
          : ""
      );
      setIndex(index - 1);
    } else {
      setPrevBtnState("disabled");
    }
  };

  const submit = (autosub) => {
    if (autosub) {
      setAutoSub(true);
      setTimeout(() => {
        setAutoSub(false);
      }, 3000);
      const response = {
        responses: JSON.parse(localStorage.getItem("questionData")),
        email: cookie.user,
      };
      setSubmitting(true);
      fetch(
        "https://us-central1-mlsc-recruitment-register.cloudfunctions.net/quiz/questions/7",
        {
          method: "POST",
          body: JSON.stringify(response),
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          redirect: "follow",
        }
      )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      setTimeout(() => {
        window.location.href = "https://www.youtube.com/watch?v=_lL2nlOzEQ8";
      }, 2000);
      return;
    } else {
      const response = {
        responses: questions,
        email: cookie.user,
      };
      setSubmitting(true);
      fetch(
        "https://us-central1-mlsc-recruitment-register.cloudfunctions.net/quiz/questions/7",
        {
          method: "POST",
          body: JSON.stringify(response),
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          redirect: "follow",
        }
      )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      setTimeout(() => {
        window.location.href = "https://www.youtube.com/watch?v=_lL2nlOzEQ8";
      }, 2000);
      return;
    }
  };

  const handleSubmit = async () => {
    await submit(false);
  };

  return (
    <>
      {loading ? (
        <Box
          width="100vw"
          height="100vh"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
        >
          <CircularProgress
            size="lg"
            color="success"
            variant="plain"
            sx={{ zIndex: 1000 }}
          />
        </Box>
      ) : (
        <>
          <Quiz_Timer submit={submit} />
          <CssBaseline />
          <Container fixed>
            <Box
              sx={{
                bgcolor: "#14213d",
                color: "white",
                minWidth: "600px",
                width: "50%",
                margin: "auto",
                position: "relative",
                padding: "2%",
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "20px",
                paddingBottom: "120px",
              }}
              className="quiz__container"
            >
              <QuizCard
                ques={questions[index]}
                setSelOption={setSelOption}
                selOption={selOption}
                active={active}
                setActive={setActive}
              />
              <Button
                variant={prevBtnState}
                size="medium"
                className="prev__button"
                onClick={prevIndex}
                disabled={submitting ? true : false}
                sx={{
                  position: "absolute",
                  bottom: "30px",
                  left: "25px",
                  width: "100px",
                  color: "white",
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  opacity: ".8",
                  ":hover": {
                    opacity: "1",
                  },
                }}
              >
                Previous
              </Button>
              <Button
                variant={nextBtnState}
                size="medium"
                className="next__button"
                onClick={nextIndex}
                disabled={submitting ? true : false}
                sx={{
                  position: "absolute",
                  bottom: "30px",
                  right: "35px",
                  width: "90px",
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  ":hover": {
                    opacity: "1",
                  },
                }}
              >
                Next
              </Button>
              {subNow ? (
                <Button
                  variant="contained"
                  size="medium"
                  className="next__button"
                  onClick={handleSubmit}
                  sx={{
                    position: "absolute",
                    bottom: "30px",
                    right: "35px",
                    width: "90px",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    background: "rgba(255,0,0,0.7)",
                    ":hover": {
                      background: "#ff5656",
                    },
                  }}
                >
                  {submitting ? "Submitting..." : "Submit"}
                </Button>
              ) : (
                ""
              )}
            </Box>
          </Container>
        </>
      )}
      {autoSub ? (
        <Snackbar open={autoSub}>
          <Alert variant="solid" color="warning" size="lg">
            Time Over, Submitting...
          </Alert>
        </Snackbar>
      ) : null}
      {error ? (
        <Snackbar open={error}>
          <Alert variant="solid" color="danger" size="lg">
            An error occured, please try again...
          </Alert>
        </Snackbar>
      ) : null}
    </>
  );
};

export default Quiz;
