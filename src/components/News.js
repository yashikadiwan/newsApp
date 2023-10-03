// used api i.e. newsapi to fetch data 

import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps={
    country:"in",
    category:"general"
  }
 
  constructor(props){
    super(props);
    this.state={
      articles:[],
      loading:false,
      page:1,
      totalresults:0
    }
    document.title=`NewsApp-${this.props.category}`
  }

  async componentDidMount(){
    this.props.setProgress(0);
    console.log("cdm");
    this.setState({loading:true});
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=2a878ba99fa540c8a790a3a56f3254c2&page=1`;
    let data=await fetch(url);
    this.props.setProgress(30);
    let parsedData= await data.json();
    this.props.setProgress(50);
    console.log(parsedData);
    this.setState({articles:parsedData.articles,loading:false, totalresults:parsedData.totalresults});
    this.props.setProgress(100);
  }

  handlePrevClick= async()=>{
    this.props.setProgress(0);
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=2a878ba99fa540c8a790a3a56f3254c2&page=${this.state.page-1}`;
    this.setState({loading:true});
    let data=await fetch(url);
    let parsedData= await data.json();
    console.log(parsedData);
    this.setState({
      page:this.state.page-1,
      articles:parsedData.articles,
      loading:false,
      totalresults:parsedData.totalresults
    })
    this.props.setProgress(100);


  }
  handleNextClick= async()=>{
    this.props.setProgress(0);
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=2a878ba99fa540c8a790a3a56f3254c2&page=${this.state.page+1}`;
    this.setState({loading:true});
    let data=await fetch(url);
    let parsedData= await data.json();
    console.log(parsedData);
    this.setState({
      page:this.state.page+1,
      articles:parsedData.articles,
      loading:false,
      totalresults:parsedData.totalresults
    })
    this.props.setProgress(100);
  }
  fetchMoreData = async () => {
   this.setState({page:this.state.page+1})
   this.setState({loading:true});
   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=2a878ba99fa540c8a790a3a56f3254c2&page=1`;
   let data=await fetch(url);
   let parsedData= await data.json();
   console.log(parsedData);
   this.setState({
    articles:this.state.articles.concat(parsedData.articles),
    loading:false, 
    totalresults:parsedData.totalresults});
  };

  render() {                                                //package installed for infinite scroll. infinte scroll and fetch more data copied from site
    return (
      <div  className='container my-3'>
        <h1 className='text-center' style={{marginTop:'90px'}}>Top Headlines</h1>
        <h1 className="text-center">{this.state.loading && <Spinner/>}</h1>
        <div className="text-center">
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!=this.state.totalresults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
          {this.state.articles.map((element)=>{ 
          return <div className="col-md-4" key={element.url}>
          <NewsItem  title={element.title?element.title.slice(0,45):""} desc={element.description?element.description.slice(0,88):""} imageurl={element.urlToImage?element.urlToImage:"https://st.depositphotos.com/1011646/1255/i/450/depositphotos_12553000-stock-photo-breaking-news-screen.jpg"} author={element.author?element.author:"unknown"} date={element.publishedAt} source ={element.source.name} newsurl={element.url}/>
          </div>
          })};
        </div>
        </div>
        </InfiniteScroll>
        </div>

        {/* previous and next buttons can also be used but we have used infinite scroll cz thats the trend */}
        {/* <div className="container d-flex justify-content-center my-3">                        
        <button type="button" disabled={this.state.page<=1} className="btn btn-dark mx-3 " onClick={this.handlePrevClick}>&larr; Previous</button>
        <button type="button" className="btn btn-dark mx-3" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        */}


      </div>
    )
  }
}

export default News
