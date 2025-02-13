import React from 'react'
import Header from '../CoursesComponents/Header'
import Why from '../CoursesComponents/Why'
import Modules from '../CoursesComponents/Modules'
import Certificate from '../Homepage/Certificate'
import FAQ from '../CoursesComponents/FAQ'
import RelatedCourses from '../CoursesComponents/RelatedCourses'
import Trustus from '../CoursesComponents/Trustus'
import Councelor from '../CoursesComponents/Councelor'
import Projects from '../CoursesComponents/Projects'
import ScrollToTop from '../components/ScrollToTop'
import Program from '../CoursesComponents/ProgramHighlights'
import Description from '../CoursesComponents/Description'

const Java = () => {
  return (
    <div>
      <main>
        <ScrollToTop />
        <Header pageId="JavaHeader" pageType="javaheader" />
        {/* <DSHeader pageId="MDAHeader" /> */}
        <Why pageId="WhyJava" pageType="Whyjava" />

        <Councelor />
        <Modules pageId="JavaModule" />
        <Trustus />
        <Certificate pageId="JavaCERT" />
        <Program />
        {/* <Projects pageId="Javainduspro" pageType="javainduspro" /> */}
        <Description pageId="java" />
        <FAQ pageId="JavaFAQ" pageType="javafaq" />
        <RelatedCourses pageId="Javarelcourses" />
      </main>
    </div>
  )
}

export default Java
