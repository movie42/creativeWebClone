import fetch from "node-fetch";
import * as prismic from "@prismicio/client";

const repoName = "flemaClone"; // Fill in your repository name.
const accessToken = process.env.PRISMIC_ACCESS_TOKEN; // If your repo is private, add an access token.
const endpoint = prismic.getEndpoint(repoName); // Format your endpoint.

// The `routes` property is your Route Resolver. It defines how you will
// structure URLs in your project. Update the types to match the Custom
// Types in your project, and edit the paths to match the routing in your
// project.
const routes = [
  {
    type: "about",
    path: "/about",
  },
];

export const client = prismic.createClient(endpoint, {
  fetch,
  accessToken,
  routes,
});
