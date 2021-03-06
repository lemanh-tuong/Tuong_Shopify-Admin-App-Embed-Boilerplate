import ApolloClient from 'apollo-boost';

interface CreateClient {
  /** Domain của shop */
  shopDomain: string;
  /** Online token hoặc offline token */
  accessToken: string;
  /** API Version - Thường là lấy luôn biến môi trường của app */
  apiVersion: string;
}

export const createClient = ({ shopDomain, accessToken, apiVersion }: CreateClient) => {
  return new ApolloClient({
    uri: `https://${shopDomain}/admin/api/${apiVersion}/graphql.json`,
    request: operation => {
      operation.setContext({
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'User-Agent': `shopify-app-node ${process.env.npm_package_version} | Shopify App CLI`,
        },
      });
    },
  });
};
