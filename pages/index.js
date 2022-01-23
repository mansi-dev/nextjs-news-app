import Head from 'next/head'
import { Toolbar } from '../components/toolbar';
import styles from '../styles/Home.module.css'

export default function Home({articlesUS, articlesCA, articlesIN}) {

  return(
    <div className='page-container'>
      <Toolbar/>
      <div className={styles.main}>
      {!!articlesUS && articlesUS.articles!==undefined && articlesUS.articles.map((article, index) => (
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
      <div className={styles.main}>
      {!!articlesCA  && articlesCA.articles!==undefined  && articlesCA.articles.map((article, index) => (
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
      <div className={styles.main}>
      {!!articlesIN && articlesIN.articles!==undefined  && articlesIN.articles.map((article, index) => (
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
    </div>
  );
}


export async function getServerSideProps() {
  const [usApiResponse, caApiResponse, inApiResponse] = await Promise.all([
    fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=general&pageSize=5`,
      {
          headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`
          }
      }
  ), 
  fetch(
    `https://newsapi.org/v2/top-headlines?country=ca&category=general&pageSize=5`,
    {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`
        }
    }
),
fetch(
  `https://newsapi.org/v2/top-headlines?country=in&category=general&pageSize=5`,
  {
      headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`
      }
  }
)
  ]);
  const [articlesUS, articlesCA, articlesIN] = await Promise.all([
    usApiResponse.json(), 
    caApiResponse.json(),
    inApiResponse.json()
  ]);
  return { props: { articlesUS, articlesCA, articlesIN } };
}