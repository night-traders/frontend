import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import news from '../news'

const Home = () => {
    const [list_news, setNews] = useState([news.data.slice(3)]);
    const [top_news, setTop] = useState([news.data.slice(0, 3)])


    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await axios()
                setNews(res.data);
                setTop(res.data.slice(0, 3))
            }
            catch (err) {
            ;
            }
        }

        fetchData();
    }, [list_news]);

    return (
        <main role="main">
            <Helmet>
                <title>News</title>
                <meta
                    name='description'
                    content='News page'
                />
            </Helmet>
            <div id="myCarousel" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src="https://image.freepik.com/free-photo/stock-market-forex-trading-graph-graphic-concept-suitable-financial-investment-economic-trends-business-idea-all-art-work-design-abstract-finance-background_73426-181.jpg" alt="Market"></img>
                        <div className="container">
                            <div className="carousel-caption text-left">
                                <h1>Example headline.</h1>
                                <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                                <p><a className="btn btn-lg btn-info" href="/signup" role="button">Sign up today</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100" src="https://specials-images.forbesimg.com/imageserve/5f492b71ee4055766258e438/960x0.jpg?fit=scale" alt="Market"></img>
                        <div className="container">
                            <div className="carousel-caption">
                                <h1>Another example headline.</h1>
                                <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                                <p><a className="btn btn-lg btn-info" href="/" role="button">Learn more</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100" src="https://www.tradestation.com/insights/wp-content/uploads/sites/2/2020/06/digital_bull_AdobeStock_217094122.jpeg" alt="Market"></img>
                        <div className="container">
                            <div className="carousel-caption text-right">
                                <h1>One more for good measure.</h1>
                                <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                                <p><a className="btn btn-lg btn-info" href="/" role="button">Browse</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            <div className="container marketing">
                <h1 className="text-center">Top news</h1>
                <hr className="mt-3 mb-3"></hr>
                <div className="row">
                {top_news[0].map(item=>
                    <div key={item.title} className="col-lg-4 d-flex flex-column">
                        <img className="d-block w-100" src={item.image_url} alt="First slide"></img>
                        <h3>{item.title}</h3>
                        <p> <span className="text-white bg-secondary p-1">{item.source_name}</span></p>
                        <p>{item.text}</p>
                        <p className="mt-auto"><a className="btn btn btn-outline-info " href={item.news_url} role="button">View details &raquo;</a></p>
                    </div>
                )}
                </div>
                <hr className="featurette-divider"></hr>
                {list_news[0].map((item, index) => 
                <div key={item.title}>
                    <div className="row featurette">
                        <div className={index%2?"col-md-7": "col-md-7 order-md-2"}>
                            <h3 >{item.title}</h3>
                            <p><span className="text-white bg-secondary p-1">{item.source_name}</span> <span className="text-muted">{item.date}</span></p>
                            <p className="lead">{item.text}</p>
                            <p className={item.sentiment === 'Negative'?'text-danger': item.sentiment === 'Positive'?'text-success': 'text-secondary'}><i>{item.sentiment}</i></p>
                            <p><a className="btn btn btn-outline-info" href={item.news_url} role="button">View details &raquo;</a></p>
                        </div>
                        <div className={index%2?"col-md-5": "col-md-5 order-md-1"}>
                        <img className="d-block w-100" src={item.image_url} alt="First slide" title={item.source_name}></img>
                        </div>
                    </div>
                    <hr className="featurette-divider"></hr>
                    </div>
                )}
            </div>
            <footer className="container">
                <p className="float-right "><a className="text-info"href="/">Back to top</a></p>
                <p>&copy; 2020 <b>Bull&Bear</b> &middot; <a className="text-info"href="/">Privacy</a> &middot; <a className="text-info" href="/">Terms</a></p>
            </footer>
        </main>
    );
}

export default Home;