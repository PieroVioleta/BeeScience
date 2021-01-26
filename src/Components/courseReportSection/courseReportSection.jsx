import React from "react";
import GradeSection from "../gradeSection/gradeSection.jsx";
import "./courseReportSection.css";

class CourseReportSection extends React.Component {
  constructor(props) {
    super(props);

    let newQuizzes = [];
    for (let i = 0; i < this.props.course.numberQuizzes; i++) {
      newQuizzes.push((i + 1).toString());
    }

    let currentQuizzesInfo = this.props.course.quizzes;
    for (let i = 0; i < currentQuizzesInfo.length; i++) {
      let num = currentQuizzesInfo[i].evaluationName[3];
      const index = newQuizzes.indexOf(num);
      if (index > -1) newQuizzes.splice(index, 1);
    }

    let newLabs = [];
    for (let i = 0; i < this.props.course.numberLabs; i++) {
      newLabs.push(toString(i + 1));
    }
    let currentLabsInfo = this.props.course.labs;
    for (let i = 0; i < currentLabsInfo.length; i++) {
      let num = currentLabsInfo[i].evaluationName[3];
      const index = newLabs.indexOf(num);
      if (index > -1) newLabs.splice(index, 1);
    }

    this.state = {
      quizzes: newQuizzes,
      labs: newLabs,
      addGradeEnable: (this.props.course.quizzes.length === this.props.course.numberQuizzes && this.props.course.labs.length === this.props.course.numberLabs && this.props.course.midtermGrade !== null && this.props.course.finalGrade !== null && this.props.course.makeUpGrade !== null) ? false : true
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.course !== prevProps.course) {
      let newQuizzes = [];
      for (let i = 0; i < this.props.course.numberQuizzes; i++) {
        newQuizzes.push((i + 1).toString());
      }

      let currentQuizzesInfo = this.props.course.quizzes;
      for (let i = 0; i < currentQuizzesInfo.length; i++) {
        let num = currentQuizzesInfo[i].evaluationName[3];
        const index = newQuizzes.indexOf(num);
        if (index > -1) newQuizzes.splice(index, 1);
      }

      let newLabs = [];
      for (let i = 0; i < this.props.course.numberLabs; i++) {
        newLabs.push(toString(i + 1));
      }
      let currentLabsInfo = this.props.course.labs;
      for (let i = 0; i < currentLabsInfo.length; i++) {
        let num = currentLabsInfo[i].evaluationName[3];
        const index = newLabs.indexOf(num);
        if (index > -1) newLabs.splice(index, 1);
      }
      this.setState({ quizzes: newQuizzes, labs: newLabs });
    }
  }

  handleAddGradeEnable() {
    this.setState({addGradeEnable: (this.props.course.quizzes.length === this.props.course.numberQuizzes && this.props.course.labs.length === this.props.course.numberLabs && this.props.course.midtermGrade !== null && this.props.course.finalGrade !== null && this.props.course.makeUpGrade !== null) ? false : true})
  }

  render() {
    return (
      <div className="course-report-section">
        <h2>
          {this.props.course.course_name} - {this.props.course.course_code}
        </h2>
        <p>Promedio del Curso: {this.props.course.courseGrade.toFixed(2)}</p>
        <p>Promedio de Prácticas: {this.props.course.testsGrade.toFixed(2)}</p>
        <table className="grades-table">
          <thead>
            <tr className="grades-table-headers">
              <th>Evaluación</th>
              <th>Nota</th>
              <th className="removeable">¿Es eliminable?</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.course.quizzes
              .sort(
                (quizA, quizB) =>
                  parseInt(quizA.evaluationName[3], 10) -
                  parseInt(quizB.evaluationName[3], 10)
              )
              .map((quiz) => (
                <GradeSection
                  key={this.props.course.course_code + quiz.evaluationName}
                  isFilled={true}
                  grade={quiz}
                  removeGrade={this.props.removeGrade}
                  courseCode={this.props.course.course_code}
                  courseID={this.props.course._id}
                  handleAddGradeEnable={() => this.handleAddGradeEnable()}
                />
              ))}
            {this.props.course.labs
              .sort(
                (labA, labB) =>
                  parseInt(labA.evaluationName[4], 10) -
                  parseInt(labB.evaluationName[4], 10)
              )
              .map((lab) => (
                <GradeSection
                  key={this.props.course.course_code + lab.evaluationName}
                  isFilled={true}
                  grade={lab}
                  removeGrade={this.props.removeGrade}
                  courseCode={this.props.course.course_code}
                  courseID={this.props.course._id}
                  handleAddGradeEnable={() => this.handleAddGradeEnable()}
                />
              ))}
            {this.props.course.midtermGrade !== null ? (
              <GradeSection
                isFilled={true}
                grade={this.props.course.midtermGrade}
                removeGrade={this.props.removeGrade}
                courseCode={this.props.course.course_code}
                courseID={this.props.course._id}
                handleAddGradeEnable={() => this.handleAddGradeEnable()}
              />
            ) : null}
            {this.props.course.finalGrade !== null ? (
              <GradeSection
                isFilled={true}
                grade={this.props.course.finalGrade}
                removeGrade={this.props.removeGrade}
                courseCode={this.props.course.course_code}
                courseID={this.props.course._id}
                handleAddGradeEnable={() => this.handleAddGradeEnable()}
              />
            ) : null}
            {this.props.course.makeUpGrade !== null ? (
              <GradeSection
                isFilled={true}
                grade={this.props.course.makeUpGrade}
                removeGrade={this.props.removeGrade}
                courseCode={this.props.course.course_code}
                courseID={this.props.course._id}
                handleAddGradeEnable={() => this.handleAddGradeEnable()}
              />
            ) : null}
            <GradeSection
              isFilled={false}
              addGrade={this.props.addGrade}
              courseCode={this.props.course.course_code}
              quizzes={this.state.quizzes}
              labs={this.state.labs}
              midterm={this.props.course.midtermGrade}
              final={this.props.course.finalGrade}
              makeUp={this.props.course.makeUpGrade}
              courseID={this.props.course._id}
              addGradeEnable={this.state.addGradeEnable}
              handleAddGradeEnable={() => this.handleAddGradeEnable()}
            />
          </tbody>
        </table>
      </div>
    );
  }
}

export default CourseReportSection;
