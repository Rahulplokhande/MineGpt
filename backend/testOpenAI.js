import getOpenAIAPIResponse from './utils/openai.js';

async function test() {
  const reply = await getOpenAIAPIResponse('Hello world');
  console.log('reply from function:', reply);
}

test();
