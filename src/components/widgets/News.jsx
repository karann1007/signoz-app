import { useEffect, useState } from "react";
import { NEWS_API_KEY } from "../../constant";

const News = () => {

    const [newsData, setNewsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNewsData = async () => {
        try {
            const response = await fetch(`https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&q=india`);
            const data = await response.json();
            setNewsData(data.results);
            console.log("NEWSS", data.results);
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
                {newsData?.slice(0, 3).map((article, index) => {
                    return <a key={index} className="news" href={article.source_url}>{article.title}</a>
                })}
            </div>
        ) : (<p>Loading...</p>)}
    </div>);
}

export default News;