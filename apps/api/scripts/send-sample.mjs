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

function generateUnitTestResults(moduleCount, classesCount, functionCount) {
  return Array.from({ length: moduleCount }, (_, index) => ({
    moduleName: `:feature${(index % 3) + 1}`,
    testClasses: Array.from({ length: classesCount }, (__, classIndex) => {
      const moduleName = `feature${(index % 3) + 1}`;
      return {
        className: `com.github.windsekirun.${moduleName}.class${classIndex}`,
        testFunctions: Array.from(
          { length: functionCount },
          (___, funcIndex) => {
            const status = funcIndex < 1 ? 'FAILED' : 'SUCCESS';
            return {
              functionName: `t${funcIndex + 1}`,
              status: status,
              testLogs: status === 'FAILED' ? generateRandomString(1024) : '',
            };
          }
        ),
      };
    }),
  }));
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

async function postBuildLog(buildId, logContent) {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/build/${buildId}/analysis/unit`,
      { log: logContent }
    );
    console.log('BuildLog saved:', response.data);
  } catch (error) {
    console.error('Failed to save BuildLog:', error);
  }
}

const buildId = '14000';
const buildLogContent = generateRandomString(800 * 1024);
const unitTestResults = generateUnitTestResults(45, 7, 10);

// postBuildLog(buildId, buildLogContent);
postBuildLog(buildId, unitTestResults);