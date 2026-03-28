import mongoose from 'mongoose';
import Thread from './models/Thread.js';
import 'dotenv/config';

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  const threads = await Thread.find({});
  threads.forEach(t => {
    console.log('thread', t.threadId, 'messages:');
    t.messages.forEach((m, idx) => {
      console.log(idx, m.role, '=>', m.content);
    });
  });
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
