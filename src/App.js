import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
         <Router> 
        <Navbar />
        <LoadingBar                                 //used loading bar package. used setprogress state and passed it as prop to define the progress
        height={4}
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <Routes>            {/* key is used so that when  we clcik on navbar links so it displayes info directly. without it, it will only send category in url */}
        <Route exact path="/" element={<News setProgress={this.setProgress} key="general" country="in" category="general"/>} /> 
        <Route exact path="/business" element={<News setProgress={this.setProgress} key="Business" country="in" category="Business"/>} /> 
        <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" country="in" category="Entertainment"/>} /> 
        <Route exact path="/general" element={<News setProgress={this.setProgress} key="/general" country="in" category="general"/>} /> 
        <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" country="in" category="health"/>} /> 
        <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" country="in" category="science"/>} /> 
        <Route exact path="/sports"element={<News setProgress={this.setProgress} key="sports" country="in" category="sports"/>} /> 
        <Route exact path="/tech" element={<News setProgress={this.setProgress} key="tech" country="in" category="tech"/>} /> 
        
        
        </Routes> 
      </Router> 
    )
  }
}
