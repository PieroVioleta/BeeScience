import React, { Component } from 'react';

class About extends Component {
  render() {

    if(this.props.data){
      var bio = this.props.data.bio;
      var integrantes = this.props.data.integrantes;
    }

    return (
      <section id="about">
      <div className="row">
         <div className="three columns">
            <img className="profile-pic"   src='images\bee.jpg' alt="logoFC" />
         </div>
         <div className="nine columns main-col">
            <h2>Acerca de Bee Science</h2>
            <p>{bio}</p>
            <h2>Integrantes: </h2>
            <ul>
               <li>{integrantes[0]}</li>
               <li>{integrantes[1]}</li>
               <li>{integrantes[2]}</li>
               <li>{integrantes[3]}</li>
            </ul>
         </div>
      </div>

   </section>
    );
  }
}

export default About;
