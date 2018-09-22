import mkdirp from 'mkdirp';
import fs from 'fs';
import { getState } from '../state';

export const PROFILE_DIRECTORY = `${process.cwd()}/${getState().fixturesDirectory}/profiles`;

export const getExistingProfileRequests = async(profile) => {
  try {
    return JSON.parse(await fs.readFileSync(`${PROFILE_DIRECTORY}/${profile}.json`, 'utf-8'));
  } catch (e) {
    return [];
  }
};

export const saveRequestsAsProfile = async function(requests, profile) {
  mkdirp(PROFILE_DIRECTORY);
  await fs.writeFileSync(`${PROFILE_DIRECTORY}/${profile}.json`, JSON.stringify(requests, null, 2), 'utf8');
};
