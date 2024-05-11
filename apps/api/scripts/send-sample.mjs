import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

function generateRandomString(size) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < size; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function postBuildLog(buildId, logContent) {
  try {
    const response = await axios.post(
      `${BASE_URL}/build/${buildId}/analysis/log`,
      { log: logContent }
    );
    console.log('BuildLog saved:', response.data);
  } catch (error) {
    console.error('Failed to save BuildLog:', error);
  }
}

const buildLogContent = generateRandomString(800 * 1024);
const buildId = '14000';

postBuildLog(buildId, buildLogContent);
