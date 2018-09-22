import fs from 'fs';
import { PROFILE_DIRECTORY } from "../services/profile";

export default async (request, response) => {

  try {
    let profiles = [];

    if (await fs.existsSync(PROFILE_DIRECTORY)) {
      profiles = await fs.readdirSync(PROFILE_DIRECTORY).map(file => file);
    }

    response.status(200).send(profiles);
  } catch (error) {
    console.error(error);
    response.status(500).send("There was a problem getting the profiles");
  }
}
