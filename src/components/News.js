import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false
    }
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=73a3b63e516d442e8c5daa55c8f7b5d2";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles});
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
      </div>
    );
  }
}

export default News;
