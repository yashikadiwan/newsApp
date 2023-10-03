import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
    let {title,desc,imageurl,newsurl,author,date,source}=this.props
    return (
      <div className="container my-3">
      <div className="card" style={{width: "18rem"}}>
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{source}</span>
      <img src={imageurl} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{desc}</p>
        <p className="card-text"><small className="text-danger">By {author} on {new Date(date).toGMTString()}</small></p>
        <a href={newsurl} className="btn btn-primary btn-sn">Read More</a>
      </div>
    </div>
    </div>
    )
  }
}

export default NewsItem
