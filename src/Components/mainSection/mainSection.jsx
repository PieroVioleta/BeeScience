import React, { useState, useEffect } from "react";
import axios from "axios";
import TermSelectionSection from "../termSelectionSection/termSelectionSection";
import TermReportSection from "../termReportSection/termReportSection";
import "./mainSection.css";

function MainSection() {
  //Get user ID 5ffa6b98f96818c0e006c1a9 set for props
  // const user_id = this.props.user_id;
  const user_id = "5ffa6b98f96818c0e006c1a9";

  const [loading, setLoading] = useState(true);
  const [currentTerm, setCurrentTerm] = useState(null);
  const [terms, setTerms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [termGradeChanged, setTermGradeChanged] = useState(false);

  //Trae data sobre los reportes de los ciclos pertenecientes a user_id
  useEffect(() => {
    var nav = document.getElementById("nav");
    nav.style.backgroundColor = "#293241";
    axios
      .get("http://localhost:8080/terms/" + user_id)
      .then((response) => {
        let terms = response.data.sort((termA, termB) =>
          termA.termCode.localeCompare(termB.termCode)
        );

        let currentTerm = terms.length === 0 ? null : terms[terms.length - 1];
        setTerms(terms);
        setCurrentTerm(currentTerm);
      })
      .catch((error) => console.log(error));
    setLoading(false);
  }, []);

  //Actualizar los cursos del ciclo cada vez que cambie CURRENT TERM
  useEffect(() => {
    if (currentTerm !== null) {
      axios
        .get("http://localhost:8080/courses/" + currentTerm._id)
        .then((response) => {
          let courses = response.data.sort(
            (courseA, courseB) => courseA.courseGrade - courseB.courseGrade
          );
          setCourses(courses);
        })
        .catch((error) => console.log(error));
    } else setCourses([]);

  }, [currentTerm]);

  //Actualizar el promedio del ciclo cada vez que cambie COURSES
  useEffect(() => {
    if (termGradeChanged === false) return;
    if (currentTerm === null) return;
    let totalWeight = courses.reduce((acc, course) => {
      return acc + course.course_weight;
    }, 0);
    let calculatedTermGrade = courses.reduce((acc, course) => {
      return acc + course.courseGrade * (course.course_weight / totalWeight);
    }, 0);

    axios
      .post("http://localhost:8080/terms/update/" + currentTerm._id, {
        termGrade: calculatedTermGrade,
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));

    let newCurrentTerm = {
      ...currentTerm,
      termGrade: calculatedTermGrade,
    };
    setCurrentTerm(newCurrentTerm);
    setTermGradeChanged(false);
  }, [termGradeChanged]);

  //Falta mandar al server
  const calculateCourseGrade = (courseReport) => {
    let courseGrade;
    let testsWeight = courseReport.evaluationSystem.testsWeight;
    let midtermWeight = courseReport.evaluationSystem.midtermWeight;
    let finalWeight = courseReport.evaluationSystem.finalWeight;
    let testsGrade = courseReport.testsGrade;
    let midtermGrade = courseReport.midtermGrade;
    let finalGrade = courseReport.finalGrade;
    let makeUpGrade = courseReport.makeUpGrade;
    let weightsSum = testsWeight + midtermWeight + finalWeight;
    let gradesSum = 0;
    if(makeUpGrade !== null) {
        //Reemplazar susti
        if(testsGrade !== null) gradesSum += testsWeight * testsGrade;
        let gradesSum1 = gradesSum, gradesSum2 = gradesSum;
        //Reemplazar parcial
        gradesSum1 += midtermWeight * makeUpGrade.grade;
        if(finalGrade !== null) gradesSum1 += finalWeight * finalGrade.grade;
        //Reemplazar final
        if(midtermGrade !== null) gradesSum2 += midtermWeight * midtermGrade.grade;
        gradesSum2 += finalWeight * makeUpGrade.grade;
        gradesSum = Math.max(gradesSum1, gradesSum2);
    }
    else {
        if(testsGrade !== null) gradesSum += testsWeight * testsGrade;
        if(midtermGrade !== null) gradesSum += midtermWeight * midtermGrade.grade;
        if(finalGrade !== null) gradesSum += finalWeight * finalGrade.grade;
    }
    courseGrade = gradesSum / weightsSum;

    axios
      .post("http://localhost:8080/courses/update/courseGrade", {
        _id: courseReport._id,
        courseGrade
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));

    return courseGrade;
  }

  //Falta mandar al server
  const calculateTestsGrade = (courseReport) => {
    let numberOfTypes = 0;
    let testsGrade = 0;
    let quizzes = courseReport.quizzes;
    let labs = courseReport.labs;
    let quizzesMeanGrade = 0,
      labsMeanGrade = 0;
    let numberQuizzes = courseReport.numberQuizzes;
    let numberLabs = courseReport.numberLabs;
    let removableQuizzes = courseReport.removableQuizzes;
    let removableLabs = courseReport.removableLabs;
    if (numberQuizzes !== 0) {
      let sumQuizGrades = quizzes.reduce((acc, quiz) => {
        return acc + quiz.grade;
      }, 0);
      quizzes = quizzes.filter((quiz) => quiz.isRemovable === true);
      quizzes.sort((quizA, quizB) => {
        return quizA.grade - quizB.grade;
      });
      let numRemovableGrades =
        (quizzes.length >= removableQuizzes
          ? removableQuizzes
          : quizzes.length) -
        (numberQuizzes - courseReport.quizzes.length);
      for (let i = 0; i < numRemovableGrades; i++) {
        sumQuizGrades -= quizzes[i].grade;
      }
      quizzesMeanGrade = sumQuizGrades / (numberQuizzes - removableQuizzes);
      numberOfTypes++;
    }
    if (numberLabs !== 0) {
      let sumLabGrades = labs.reduce((acc, lab) => {
        return acc + lab.grade;
      }, 0);
      labs = labs.filter((lab) => lab.isRemovable === true);
      labs.sort((labA, labB) => {
        return labA.grade - labB.grade;
      });
      let numRemovableGrades =
        labs.length >= removableLabs
          ? removableLabs
          : labs.length - (numberLabs - courseReport.labs.length);
      for (let i = 0; i < numRemovableGrades; i++) {
        sumLabGrades -= labs[i].grade;
      }
      labsMeanGrade = sumLabGrades / (numberLabs - removableLabs);
      numberOfTypes++;
    }
    if (numberOfTypes !== 0)
      testsGrade = (quizzesMeanGrade + labsMeanGrade) / numberOfTypes;

      axios
      .post("http://localhost:8080/courses/update/testsGrade", {
        _id: courseReport._id,
        testsGrade
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
    
    return testsGrade;
  };

  const handleAddTerm = (termCode) => {
    if (termCode === "") {
      alert(`No se pudo agregar. Ningún ciclo fue seleccionado`);
      return;
    }
    let auxTerm = terms.filter((term) => term.termCode === termCode);
    if (auxTerm.length !== 0) {
      alert(
        `No se pudo agregar. El reporte del ciclo ${termCode} ya fue agregado anteriormente`
      );
      return;
    }
    if (terms.length > 15) {
      alert("No se puede agregar más ciclos. Limite máximo de ciclos: 15");
      return;
    }

    axios
      .post("http://localhost:8080/terms/add", {
        user_id,
        termCode,
      })
      .then((response) => {
        let newTerms = terms
          .concat(response.data)
          .sort((termA, termB) => termA.termCode.localeCompare(termB.termCode));
        setTerms(newTerms);
        setCurrentTerm(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleSelectTerm = (termCode) => {
    if (termCode === "default") {
      setCurrentTerm(null);
      return;
    }
    let termSelected = terms.filter((term) => term.termCode === termCode)[0];
    setCurrentTerm(termSelected);
  };

  const handleRemoveTerm = (termCode) => {
    if (termCode === "") {
      alert(`No se pudo eliminar. Ningún ciclo fue seleccionado`);
      return;
    }
    let auxTerm = terms.filter((term) => term.termCode === termCode);
    if (auxTerm.length === 0) {
      alert(`No se pudo eliminar. El reporte del ciclo ${termCode} no existe`);
      return;
    }

    let _id = auxTerm[0]._id;
    axios
      .delete("http://localhost:8080/terms/delete/" + _id)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));

    let newTerms = terms.filter((term) => term.termCode !== termCode);
    if (currentTerm._id !== _id) {
      setTerms(newTerms);
      return;
    }
    let newCurrentTerm =
      newTerms.length === 0 ? null : newTerms[newTerms.length - 1];
    setTerms(newTerms);
    setCurrentTerm(newCurrentTerm);
  };

  const handleAddCourse = (courseCode) => {
    if (courseCode === "") {
      alert(`No se pudo agregar. Ningún curso fue seleccionado`);
      return;
    }
    let auxCourse = courses.filter(
      (course) => course.course_code === courseCode
    );
    if (auxCourse.length !== 0) {
      alert(
        `No se pudo agregar. El reporte del curso ${courseCode} ya fue agregado anteriormente`
      );
      return;
    }
    if (courses.length > 10) {
      alert("No se puede agregar más cursos. Limite máximo de cursos: 10");
      return;
    }

    let termReport_id = currentTerm._id;
    axios
      .post("http://localhost:8080/courses/add", {
        termReport_id,
        course_code: courseCode,
      })
      .then((response) => {
        if (response.data === null) {
          alert(`El curso no fue agregado. El curso ${courseCode} no existe`);
          return;
        }
        let newCourses = courses
          .concat(response.data)
          .sort(
            (courseA, courseB) => courseA.courseGrade - courseB.courseGrade
          );
        setCourses(newCourses);
        setTermGradeChanged(true);
      })
      .catch((error) => console.log(error));
  };

  const handleRemoveCourse = (courseCode) => {
    if (courseCode === "") {
      alert(`No se pudo eliminar. Ningún curso fue seleccionado`);
      return;
    }
    let course = courses.filter(
      (course) => course.course_code === courseCode
    )[0];
    if (course === undefined) {
      alert(
        `No se pudo eliminar. No existe ningún reporte del curso ${courseCode} en este ciclo`
      );
      return;
    }

    let _id = course._id;
    axios
      .delete("http://localhost:8080/courses/delete/" + _id)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));

    let newCourses = courses.filter(
      (course) => course.course_code !== courseCode
    );
    setTermGradeChanged(true);
    setCourses(newCourses);
  };

  const handleAddGrade = (courseID, newGrade) => {
    axios
      .post("http://localhost:8080/grades/add/" + courseID, { newGrade })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));

    let newCourses = [...courses];
    newCourses.forEach((course) => {
      if (course._id === courseID) {
        let evaluationType = newGrade.evaluationName.substr(0, 2);
        switch (evaluationType) {
          case "PC":
            course.quizzes.push(newGrade);
            course.testsGrade = calculateTestsGrade(course);
            break;
          case "LA":
            course.labs.push(newGrade);
            course.testsGrade = calculateTestsGrade(course);
            break;
          case "EP":
            course.midtermGrade = newGrade;
            break;
          case "EF":
            course.finalGrade = newGrade;
            break;
          case "ES":
            course.makeUpGrade = newGrade;
            break;
          default:
        }
        course.courseGrade = calculateCourseGrade(course);
      }
    });
    setCourses(newCourses);
    setTermGradeChanged(true);
  };

  const handleRemoveGrade = (courseID, evaluationName) => {
    axios
      .post("http://localhost:8080/grades/delete/" + courseID, {
        evaluationName,
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));

      let newCourses = [...courses];
      newCourses.forEach((course) => {
        if (course._id === courseID) {
          let evaluationType = evaluationName.substr(0, 2);
          switch (evaluationType) {
            case "PC":
              course.quizzes = course.quizzes.filter(quiz => quiz.evaluationName !== evaluationName);
              course.testsGrade = calculateTestsGrade(course);
              break;
            case "LA":
              course.labs = course.labs.filter(lab => lab.evaluationName !== evaluationName);
              course.testsGrade = calculateTestsGrade(course);
              break;
            case "EP":
              course.midtermGrade = null;
              break;
            case "EF":
              course.finalGrade = null;
              break;
            case "ES":
              course.makeUpGrade = null;
              break;
            default:
          }
          course.courseGrade = calculateCourseGrade(course);
        }
      });
      setCourses(newCourses);
      setTermGradeChanged(true);
  };

  return (
    <div className="main-section">
      <TermSelectionSection
        terms={terms.map((term) => term.termCode)}
        currentTerm={currentTerm}
        selectTerm={(termCode) => handleSelectTerm(termCode)}
        addTerm={(termCode) => handleAddTerm(termCode)}
        removeTerm={(termCode) => handleRemoveTerm(termCode)}
      />
      {loading === true ? (
        <h1 className="loading">Cargando...</h1>
      ) : (
        <TermReportSection
          currentTerm={currentTerm}
          courses={courses}
          addCourse={(courseCode) => handleAddCourse(courseCode)}
          removeCourse={(courseCode) => handleRemoveCourse(courseCode)}
          addGrade={(courseID, newGrade) => handleAddGrade(courseID, newGrade)}
          removeGrade={(courseID, evaluationName) =>
            handleRemoveGrade(courseID, evaluationName)
          }
        />
      )}
    </div>
  );
}

export default MainSection;
