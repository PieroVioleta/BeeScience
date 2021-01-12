import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import TermSelectionSection from "../termSelectionSection/termSelectionSection";
import TermReportSection from "../termReportSection/termReportSection";
import "./mainSection.css";

function MainSection() {
  //Get user ID 5ffa6b98f96818c0e006c1a9 set for props
  // const user_id = this.props.user_id;
  const user_id = "5ffa6b98f96818c0e006c1a9";
  const [loading, setLoading] = useState(true);
  const [currentTerm, setCurrentTerm] = useState({
    _id: "",
    user_id: user_id,
    termCode: "",
    termGrade: 0.0,
  });
  const [terms, setTerms] = useState([]);
  const [termCodes, setTermCodes] = useState([]);
  const [courses, setCourses] = useState([]);

  //Manda el id al server
  var socket = io.connect("http://localhost:8080", {
    query: "user_id=" + user_id,
  });

  useEffect(() => {
    // data = {termData, currentTerm}
    socket.on("getTerms", (data) => {
      let termCodes = (data.termsData).map((termData) => termData.termCode).sort();
      let lastTerm =
        termCodes.length === 0
          ? null
          : data.termsData.filter(
              (termData) =>
                termData.termCode === termCodes[termCodes.length - 1]
            )[0];
      setLoading(false);
      if(data.currentTerm === null) {
        setCurrentTerm(lastTerm);
        socket.emit('setCurrentTerm', (lastTerm === null) ? "" : lastTerm._id);
      }
      else {
        setCurrentTerm(data.currentTerm);
      }
      setTerms(data.termsData);
      setTermCodes(termCodes);
    });
    socket.on("getCourses", (courses) => {
      setCourses(courses);
    });
    socket.on("courseNotFound", (courseCode) => {
      alert(`El curso ${courseCode} no existe`);
    })
  }, []);

  const handleAddTerm = (termCode) => {
    if (termCode === "") {
      alert(
        `No se pudo agregar. Ningún ciclo fue seleccionado`
      );
      return;
    }
    let auxTerm = terms.filter((term) => term.termCode === termCode);
    if (auxTerm.length !== 0) {
      alert(
        `No se pudo agregar. El reporte del ciclo ${termCode} ya fue agregado anteriormente`
      );
      return;
    }
    if (terms.length > 20) {
      alert("No se puede agregar más ciclos. Limite máximo de ciclos: 20");
      return;
    }
    let newTerm = {
      user_id: user_id,
      termCode: termCode,
    };
    socket.emit("postTerm", newTerm);
  };

  const handleSelectTerm = (termCode) => {
    if (termCode === "default") {
      setCurrentTerm(null);
      return;
    }
    let termSelected = terms.filter((term) => term.termCode === termCode)[0];
    setCurrentTerm(termSelected);
    socket.emit('setCurrentTerm', termSelected._id);
  };

  const handleRemoveTerm = (termCode) => {
    if (termCode === "") {
      alert(
        `No se pudo eliminar. Ningún ciclo fue seleccionado`
      );
      return;
    }
    let auxTerm = terms.filter((term) => term.termCode === termCode);
    if (auxTerm.length === 0) {
      alert(
        `No se pudo eliminar. El reporte del ciclo ${termCode} no existe`
      );
      return;
    }
    let term_id = terms.filter((term) => term.termCode === termCode)[0]._id;
    socket.emit("deleteTerm", term_id);
  };

  const handleAddCourse = (courseCode) => {
    if (courseCode === "") {
      alert(
        `No se pudo agregar. Ningún curso fue seleccionado`
      );
      return;
    }
    let auxCourse = courses.filter((course) => course.course_code === courseCode);
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
    let newCourse = {
      termReport_id: currentTerm._id,
      course_code: courseCode,
    };
    socket.emit("postCourse", newCourse);
  }

  const handleRemoveCourse = (courseCode) => {
    if (courseCode === "") {
      alert(
        `No se pudo eliminar. Ningún curso fue seleccionado`
      );
      return;
    }
    let course = courses.filter((course) => course.course_code === courseCode)[0];
    if(course === undefined) {
      alert(`No se pudo eliminar. No existe ningún reporte del curso ${courseCode} en este ciclo`);
      return;
    }
    let course_id = course._id;
    socket.emit("deleteCourse", course_id);
  }

  const handleAddGrade = (courseCode, newGrade) => {
    socket.emit("postGrade", {course_code: courseCode, newGrade: newGrade});
  }

  const handleRemoveGrade = (courseCode, grade) => {
    socket.emit("removeGrade", {course_code: courseCode, grade: grade});
  }
  
  return (
    <div className="main-section">
      <TermSelectionSection
        terms={termCodes}
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
          addGrade={(courseCode, newGrade) => handleAddGrade(courseCode, newGrade)}
          removeGrade={(courseCode, grade) => handleRemoveGrade(courseCode, grade)}
        />
      )}
    </div>
  );
}

export default MainSection;
