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

function generateLogContent(count) {
  let result = ''
  for (let i = 0; i < count; i++) {
    result += `${generateRandomString(4)} ${generateRandomString(4)} ${generateRandomString(4)} ${generateRandomString(17)}\n`
  }
  return result;
}

function generateUnitTestResults(moduleCount, classesCount, functionCount) {
  return Array.from({ length: moduleCount }, (_, index) => ({
    moduleName: `:feature${index + 1}`,
    testClasses: Array.from({ length: classesCount }, (__, classIndex) => {
      const moduleName = `feature${index + 1}`;
      return {
        className: `com.github.windsekirun.${moduleName}.class${classIndex}`,
        testFunctions: Array.from(
          { length: functionCount },
          (___, funcIndex) => {
            const status = funcIndex < 1 ? 'FAILED' : 'PASSED';
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

async function registerBuild(buildId) {
  try {
    const response = await axios.post(
      `${BASE_URL}/build/${buildId}/analysis/register`
    );
    console.log('BuildLog saved:', response.data);
  } catch (error) {
    console.error('Failed to save BuildLog:', error);
  }
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

async function postUnitTestResults(buildId, unitTestResults) {
  try {
    const response = await axios.post(
      `${BASE_URL}/build/${buildId}/analysis/unit`,
      unitTestResults
    );
    console.log('UnitTestResults saved:', response.data);
  } catch (error) {
    console.error('Failed to save UnitTestResults:', error);
  }
}

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

for (let i = 0; i < 5; i++) {
  const buildId = 14000 + i;
  const buildLogContent = generateLogContent(800);
  const unitTestResults = generateUnitTestResults(45, 7, 10);
  const id = buildId.toString();

  await registerBuild(id);
  await sleep(1000);
  await postBuildLog(id, buildLogContent);
  await sleep(1000);
  await postUnitTestResults(id, unitTestResults);
}