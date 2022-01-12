import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=73a3b63e516d442e8c5daa55c8f7b5d2&page=1pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults});
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=73a3b63e516d442e8c5daa55c8f7b5d2&page=${this.state.page-1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page:this.state.page - 1,
      articles: parsedData.articles
    })
  }
  handleNextClick = async () => {
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){

    }
    else{
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=73a3b63e516d442e8c5daa55c8f7b5d2&page=${this.state.page+1}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page:this.state.page + 1,
        articles: parsedData.articles
      })
    }
  }


  render() {
    return (
      <div className="container my-3">
        <h1 className="my-4">NewsMonk - Top Headlines</h1>
        <div className="row">
        {this.state.articles.map((element) => {
          return  <div className="col-md-4" key={element.url} >
            <NewsItem
              title={element.title}
              description={element.description}
              imageUrl={element.urlToImage}
              newsUrl={element.url}
            />
        </div>
        })}  
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
