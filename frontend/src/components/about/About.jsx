import React from "react";
import "./about.css";
import US from "../../assets/360mind logo.png";
import { BiAward } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

const About = () => {
  return (
    <section id="about">
      <h5>Get to know</h5>
      <h2>About us</h2>

      <div className="container about__container">
        <div className="about__us">
          <div className="about__us-image">
            <img src={US} alt="About" />
          </div>
        </div>

        <div className="about__content">
          <div className="about__cards">
            <article className="about__card">
              <BiAward className="about__icon" />
              <h5>Experience</h5>
              <small>2+ years working</small>
            </article>

            <article className="about__card">
              <FaUsers className="about__icon" />
              <h5>Users</h5>
              <small>1000+ worldwide</small>
            </article>
          </div>

          <p>
            360 Mind is a cutting-edge company at the forefront of the digital
            mental health industry, specializing in the development of
            innovative products and solutions. With a primary focus on enhancing
            mental well-being, 360 Mind has positioned itself as a key player in
            the digital products landscape. Through a thoughtful combination of
            advanced technology and a deep understanding of mental health, the
            company is dedicated to providing impactful solutions that cater to
            the unique needs of individuals in the United States and the
            European Union.
          </p>
          <p>
            As a trailblazer in the realm of mental health-related digital
            products, 360 Mind is committed to creating tools that empower users
            to take charge of their mental wellness journey. From personalized
            mindfulness applications to interactive therapy platforms, the
            company leverages state-of-the-art technologies to deliver
            comprehensive and user-friendly solutions. 360 Mind's
            customer-centric approach is reflected in its commitment to serving
            a diverse clientele across the United States and the European Union.
            By aligning its products with the cultural nuances and mental health
            landscapes of these regions, the company ensures that its offerings
            resonate with users and address their specific challenges.
          </p>

          <a href="#contact" className="btn btn-primary">
            Let's talk!
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
