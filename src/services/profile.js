import mkdirp from 'async-mkdirp';
import fs from 'fs';
import path from 'path';
import { getState } from './state';

const PROFILES = 'profiles';
const FIXTURES_DIRECTORY = () => `${process.cwd()}/${getState().fixturesDirectory}`;
export const PROFILE_DIRECTORY = () => `${FIXTURES_DIRECTORY()}/${PROFILES}`;

export const getExistingProfileRequests = async(profile) => {
  try {
    return JSON.parse(await fs.readFileSync(`${PROFILE_DIRECTORY()}/${profile}.json`, 'utf-8'));
  } catch (e) {
    return [];
  }
};

export const saveRequestsAsProfile = async function(requests, profile) {
  await mkdirp(PROFILE_DIRECTORY());
  await fs.writeFileSync(`${PROFILE_DIRECTORY()}/${profile}.json`, JSON.stringify(requests, null, 2), 'utf8');
  await createProfileData();
};

const createProfileData = async function() {
    const profileDataFilePath = `${FIXTURES_DIRECTORY()}/profileData.js`;
    try {
        await fs.unlinkSync(`${profileDataFilePath}`);
        console.log('successfully deleted '+profileDataFilePath);
    } catch (e) {
        console.log('There is no profile data yet!');
    }

    let profileDataContent = '';
    const files = await fs.readdirSync(PROFILE_DIRECTORY());
    files.forEach((file) => {
       const profileName = path.basename(file, '.json');
       profileDataContent += `export const ${profileName.toLowerCase()} = () => require('./${PROFILES}/${profileName}');\n\n`;
    });

    await fs.writeFileSync(profileDataFilePath, profileDataContent);
};