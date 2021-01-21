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

  const getCourses = (currentTerm) => {
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
  };

  //Trae data sobre los reportes de los ciclos pertenecientes a user_id
  const getTerms = (user_id) => {
    axios
      .get("http://localhost:8080/terms/" + user_id)
      .then((response) => {
        let terms = response.data.sort((termA, termB) =>
          termA.termCode.localeCompare(termB.termCode)
        );

        let currentTerm = terms.length === 0 ? null : terms[terms.length - 1];
        setTerms(terms);
        setCurrentTerm(currentTerm);
        getCourses(currentTerm);
      })
      .catch((error) => console.log(error));
  };

  const updateTermGrade = () => {
    if (currentTerm === null) return;
    let totalWeight = courses.reduce((acc, course) => {
      return acc + course.course_weight;
    }, 0);
    let calculatedTermGrade = courses.reduce((acc, course) => {
      return acc + course.courseGrade * (course.course_weight / totalWeight);
    }, 0);
    
    axios
      .post("http://localhost:8080/terms/update/" + currentTerm._id, {
        termGrade: calculatedTermGrade
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));

    let newCurrentTerm = {
        ...currentTerm,
        termGrade: calculatedTermGrade,
    };
    console.log("nuevo", newCurrentTerm);
    setCurrentTerm(newCurrentTerm);

    return;
  };

  useEffect(() => {
    getTerms(user_id);
    setLoading(false);
    // socket.on("courseNotFound", (courseCode) => {
    //   alert(`El curso ${courseCode} no existe`);
    // })
  }, []);

  useEffect(() => {
    updateTermGrade();
  }, [courses]);

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
        setCourses([]);
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
    getCourses(termSelected);
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
    getCourses(newCurrentTerm);
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
        let newCourses = courses
          .concat(response.data)
          .sort(
            (courseA, courseB) => courseA.courseGrade - courseB.courseGrade
          );
        setCourses(newCourses);
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
    setCourses(newCourses);
  };

  const handleAddGrade = (courseCode, newGrade) => {
    // socket.emit("postGrade", {course_code: courseCode, newGrade: newGrade});
  };

  const handleRemoveGrade = (courseCode, grade) => {
    // socket.emit("removeGrade", {course_code: courseCode, grade: grade});
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
          addGrade={(courseCode, newGrade) =>
            handleAddGrade(courseCode, newGrade)
          }
          removeGrade={(courseCode, grade) =>
            handleRemoveGrade(courseCode, grade)
          }
        />
      )}
    </div>
  );
}

export default MainSection;
