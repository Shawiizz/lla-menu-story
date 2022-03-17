import { IgApiClient } from 'instagram-private-api';

const username = 'sauc_issonsauvage'
const password = ''
const ig = new IgApiClient();

async function login() {
    ig.state.generateDevice(username);
    await ig.account.login(username, password);
}

(async () => {
    /*
  await login();

  const path = './story.jpg';
  const file = await readFileAsync(path);

  await ig.publish.story({
    file,
  });*/

})()