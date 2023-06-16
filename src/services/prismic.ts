import * as prismic from '@prismicio/client';
import { HttpRequestLike } from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/next';

export interface PrismicConfig {
  req?: HttpRequestLike;
}

// export function getPrismicClient(){
//   return prismic.createClient("criando-projeto-do-zero-1-0")

//   // return prismic2
// } 

export function getPrismicClient(config: PrismicConfig): prismic.Client {
  const client = prismic.createClient(process.env.PRISMIC_API_ENDPOINT);

  enableAutoPreviews({
    client,
    // previewData: config.req
    // accessToken: process.env.PRISMIC_API_ENDPOINT,
    // req: config.req,
  })

  return client;
}
