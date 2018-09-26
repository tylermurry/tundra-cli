import { getExistingProfileRequests } from "./profile";
import stringSimilarity from 'string-similarity';
import _ from "lodash";

export const SIMILARITY_THRESHOLD = 0.75;

export const getClosestProfileMatches = async (originalRequest, profileName) => {

  const requests = await getExistingProfileRequests(profileName);

  let matches = [];

  // Calculate the similarity for the URL of each request
  requests.forEach(request => {
    const similarity = stringSimilarity.compareTwoStrings(originalRequest.request.url, request.request.url);

    if (similarity > SIMILARITY_THRESHOLD)
      matches.push({ similarity, request });
  });

  return _(matches)
    .chain()
    .sortBy('similarity')
    .value()
    .reverse();
};
