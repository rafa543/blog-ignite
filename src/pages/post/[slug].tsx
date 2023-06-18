import { GetStaticPaths, GetStaticProps } from 'next';

import { getPrismicClient } from '../../services/prismic';
import * as prismicHelpers from '@prismicio/helpers';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import Header from '../../components/Header';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { RichText } from 'prismic-dom';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) : JSX.Element{

  post.data.content.map(content => {
    console.log(content.body[0].text);
  })

  return (
    <>
      <Header />
      <main className={styles.container}>
        <div className={styles.banner}>
          <img src={post.data.banner.url} alt="fdsfsd" />
        </div>
        <div>
          <h1>{post.data.title}</h1>
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <FiCalendar color='#BBBBBB' />
              <span>{post.first_publication_date}</span>
            </div>
            <div className={styles.infoItem}>
              <FiUser color='#BBBBBB' />
              <span>{post.data.author}</span>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.heading}>
            {post.data.content.map(content => (
              <div className={styles.postContent} key={content.heading}>
                <h1>{content.heading}</h1>
                <p>{content.body[0].text}</p>
              </div>
            ))}
          </div>
        </div>
        
      </main>
    </>
  )
}

export const getStaticPaths = async () => {
  // const prismic = getPrismicClient({});
  // const posts = await prismic.getByType(TODO);

  return {
    paths: [],
    fallback: 'blocking'
  }
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params as any
  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('posts', slug);
  console.log(JSON.stringify(response, undefined, 2))
  console.log('--------------------------------------------')

  // console.log(prismicHelpers.asHTML(response.data.content))


  const post = {
    first_publication_date: new Date(response.first_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }),
    data: {
      title: response.data.title,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author.find((author: any) => author.type === 'paragraph')?.text ?? '',
      content: [
        {
          heading: response.data.content.map(post => {
            return post.heading.find((heading: any) => heading.type === 'paragraph')?.text ?? ''
          })[0],
          body: [
            {
              text: response.data.content.map(post => {
                return post.body.find((body: any) => body.type === 'paragraph')?.text ?? ''
              })[0],
            }
          ]
        }
      ]
      // content: prismicHelpers.asHTML(response.data.content)
    },
  }

  // console.log("******************************")

  // console.log(JSON.stringify(post, undefined, 2))
  return {
    props: { post }
  }
};
