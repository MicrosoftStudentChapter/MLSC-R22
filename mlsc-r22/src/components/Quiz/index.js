import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import QuizCard from "../QuizCard/index";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./quiz.module.css";
import Quiz_Timer from "../Quiz_Timer";
import { useCookies } from "react-cookie";
// const questions = [
//   {
//     question:
//       'int main()\n{\n        char *str="MLASSI";\n        printf("%d,%d\\n",strlen(str),sizeof(str));\n        return 0;\n}\n',
//     options: ["1", "2", "3", "4"],
//     selected: "",
//   },
//   {
//     question:
//       "Question 2: Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta fugiat necessitatibus nostrum suscipit quasi quo.",
//     options: ["1", "2", "3", "4"],
//     selected: "",
//   },
//   {
//     question:
//       "Question 3: Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, expedita? Vel quae eos omnis ut hic vitae perferendis assumenda quos eius non! Id, mollitia autem.",
//     options: ["1", "2", "3", "4"],
//     selected: "",
//   },
//   {
//     question:
//       "Question 4: Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio excepturi velit consequuntur laborum cupiditate, iure ut, corporis iusto facere natus consectetur. Quod dolores repellendus fuga quasi eius alias dolorum facere. Ullam, deleniti et reprehenderit itaque debitis consequuntur eum sed similique! Voluptatem, esse? Dolorum, doloremque! Tempore dolores vero autem illum accusamus, illo perferendis ad itaque assumenda non atque laudantium ratione quas! Vel nostrum alias quos minima in similique molestiae, dolorem ratione rem eaque eius atque adipisci labore pariatur culpa dolorum debitis perspiciatis mollitia odit eum rerum magnam, tenetur quia dolor? Odio, tempora sunt perspiciatis asperiores error dolore sed nihil quas rem.",
//     options: ["1", "2", "3", "4"],
//     selected: "",
//   },
// ];

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [prevBtnState, setPrevBtnState] = useState("contained");
  const [nextBtnState, setNextBtnState] = useState("contained");

  const [selOption, setSelOption] = useState("");
  const [active, setActive] = useState("");

  const [subNow, setSubNow] = useState(false);
  const [questions, setQuestions] = useState([
    { question: "Loading", options: [1, 2, 3, 4], link: "" },
  ]);

  const [cookie, setCookie] = useCookies(["users"]);
  useEffect(() => {
    setActive(selOption);
  }, [selOption]);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        "https://us-central1-mlsc-recruitment-register.cloudfunctions.net/quiz/questions/6",
        {
          method: "GET",
          // headers: {
          //   "Content-Type": "application/x-www-form-urlencoded",
          // },
          // body: bodyData,
          redirect: "follow",
        }
      );
      if (!res.ok) {
        const message = `An error has occured: ${res.status}`;
        throw new Error(message);
      } else {
        const data = await res.json();
        setQuestions(data.data);

        if (
          localStorage.getItem("questionData") === null ||
          localStorage.getItem("questionData") === undefined
        ) {
          localStorage.setItem("questionData", JSON.stringify(questions));
        } else {
          const vals = JSON.parse(localStorage.getItem("questionData"));
          questions.forEach((question, i) => {
            question.selected = vals[i].selected;
          });
        }
      }
    })();
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

  const submit = () => {
    const response = {
      responses: questions,
      email: cookie.user.email,
    };
    fetch(
      "https://us-central1-mlsc-recruitment-register.cloudfunctions.net/quiz/questions/6",
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
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }, 2000);
  };

  return (
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
              onClick={submit}
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
              Submit
            </Button>
          ) : (
            ""
          )}
        </Box>
      </Container>
    </>
  );
};

export default Quiz;
