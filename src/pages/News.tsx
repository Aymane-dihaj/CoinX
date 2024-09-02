import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getNews } from '../utils/getNews';
import Loader from '../components/ui/Loader';
import Paper from '../components/Paper';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ui/ScrollToTop';

const News = () => {
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const data = await getNews();
        if (data) {
            setNews(data);
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            {
                loading ? <Loader /> :
                <>
                    <div className='w-full pt-40 space-y-20 py-20 mt-16'>
                        <h1 className='text-3xl lg:text-5xl font-semibold w-full text-center '>Latest Crypto<span className='text-themeColor mx-2'>News</span></h1>
                        <div className='flex flex-wrap items-center justify-center gap-10'>
                            {
                                news?.map((paper: any, idx: number) => (
                                    <Paper 
                                        key={paper.id}
                                        image={paper.imageurl}
                                        url={paper.url}
                                        title={paper.title}
                                        body={paper.body}
                                        tags={paper.tags}
                                        publish_time={paper.published_on}
                                        delay={(idx % 4) * 0.2}
                                        catego={paper.catego}
                                        source={paper.source}
                                    />
                                ))
                            }
                        </div>
                    </div>
                    <Footer />
                    <ScrollToTopButton/>
                </>
            }
        </>
    );
};

export default News;
