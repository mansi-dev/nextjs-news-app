import styles from '../../styles/Feed.module.css';
import {useRouter} from 'next/router';
import { Toolbar } from '../../components/toolbar';


export const BusinessFeed = ({pageNumber, articles}) => {
    console.log("-------------------------------------------")
    console.log(articles);
    console.log(pageNumber);
    const router = useRouter();

    return(
       <div className='page-container'>
            <Toolbar/>
            <div className={styles.main}>
            {!!articles && articles.map((article, index) => (
                <div key={index} className={styles.post}>
                    <h1 onClick={()=>(window.location.href = article.url)}>{article.title.split(' - ')[0]}</h1>
                    <p className={styles.sourceName}>{article.title.split(' - ')[1]}</p>
                    <p className={styles.desc}>{article.description}</p>
                    {!!article.urlToImage && <img src={article.urlToImage}/>}
                    {!!article.author && <p className={styles.author}> - {article.author}</p> }

                </div>
            ))

            }
        </div>
        <div className={styles.paginator}>
            <div 
            onClick={() => {
                if(pageNumber > 1){
                    router.push(`/business-feed/${pageNumber - 1}`).then(() => window.scrollTo(0,0));
                }
            }}
            className={pageNumber === 1 ? styles.disabled : styles.active}>
                Previous
            </div>
            <div>#{pageNumber}</div>
            <div 
            onClick={() => {
                if(pageNumber < 5){
                    router.push(`/business-feed/${pageNumber + 1}`).then(() => window.scrollTo(0,0));
                }
            }}
            className={pageNumber === 5 ? styles.disabled : styles.active}>
                Next
            </div>
        </div>
       </div>
    )
};

export const getServerSideProps = async pageContext => {
    const pageNumber = pageContext.query.businessFeed;

    if(!pageNumber || pageNumber < 1 || pageNumber > 5){
        return{
            props: {
                articles: [],
                pageNumber: 1,
            }
        }
    }
    const apiResponse = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=7&page=${pageNumber}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`
            }
        }
    );

    const apiJson = await apiResponse.json()

    const {articles} = apiJson;
    console.log(apiJson);

    return {
        props: {
            articles,
            pageNumber: Number.parseInt(pageNumber),
        }
    }
};

export default BusinessFeed;