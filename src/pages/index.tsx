import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import Header from '../components/Header';
import PostComponent from '../components/PostComponent';

export interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

interface PostProps {
  posts: Post[];
}

export default function Home({ posts }: PostProps) {
  console.log(posts.map(post => console.log(post.data)));
  return (
    <>
      <Header />
      <main className={styles.contentContainer}>
        {
          posts.map(post => (
            <PostComponent post={post} key={post.uid}/>
          ))
        }
      </main>
    </>
  )
}

export const getStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType("posts");
  // console.log(JSON.stringify(postsResponse, null, 2))
  // console.log(postsResponse)

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle.find((subtitle: any) => subtitle.type === 'paragraph')?.text ?? '',
        author: post.data.author.find((author: any) => author.type === 'paragraph')?.text ?? '',
      },
      first_publication_date: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
      // banner: post.data.banner.url,
      // heading: post.data.fdsafsdafsd.map(post => {
      //   return post.heading.find((heading: any) => heading.type === 'paragraph')?.text ?? ''
      // })[0],
      // headingBody: post.data.fdsafsdafsd.map(post => {
      //   return post.body.find((heading: any) => heading.type === 'paragraph')?.text ?? ''
      // })[0]

    }
  })

  console.log("********************************")

  // console.log(posts)
  return {
    props: { posts }
  }
};
