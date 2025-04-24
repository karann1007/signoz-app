import { useEffect, useState } from "react";
import { NEWS_API_KEY } from "../../constant";

const News = () => {

    const [newsData, setNewsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNewsData = async () => {
        try {
            const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`);
            const data = await response.json();
            setNewsData(data);
            console.log("NEWSS", data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchNewsData();
    }, []);

    if (loading) {
        return <p>Loading....</p>
    }

    if (error) {
        return <p>Error : {error.message}</p>
    }

    return (<div className="">
        {newsData ? (
            <div className="flex flex-col">
                {newsData?.articles?.slice(0, 3).map((article, index) => {
                    return <a key={index} className="news" href={article.url}>{article.title}</a>
                })}
            </div>
        ) : (<p>Loading...</p>)}
    </div>);
}

export default News;