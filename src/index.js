import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import QuizService from "./quizService/index.js";
import QuestionBox from "./components/questionBox";
import Result from "./components/result";

class QuizApp extends Component{

    state = {
        questionBank: [],
        score:0,
        response:0
    };

    getQuestion = () => {
        QuizService().then(question =>{
            this.setState({
                questionBank: question
            });
        });
    };

    computAnswer=(answer,correctAnswer)=>
    {
        if(answer===correctAnswer){
            this.setState({
                score: this.state.score + 1
            });
        }

        this.setState({
            response: this.state.response < 5 ? this.state.response + 1 : 5
        })
    }

    playAgain=()=>
    {
        this.getQuestion();
        this.setState({
            score:0,
            response:0
        });
    }

    componentDidMount() {
        this.getQuestion()
    }

    render() 
    {
        return(
            <div className="container">
                <div className="title">
                    quizApp
                </div>
                {this.state.questionBank.length > 0 && this.state.response <5 && this.state.questionBank.map(({question,answers,correct,questionID}) => 
                <QuestionBox question={question} options={answers} key={questionID}  selected={answer=>this.computAnswer(answer,correct)} />
                    ) }

                {this.state.response===5?(<Result score={this.state.score} playAgain={this.playAgain}/>):null}
            </div>
        );
    }

}

ReactDOM.render(<QuizApp />, document.getElementById("root"));