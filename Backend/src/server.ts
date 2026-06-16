import app from './app';
import envConstants from './constants/env.constant';
import connectDB from './database/mongodb';
import dns from 'dns';

dns.setServers(["8.8.8.8", "1.1.1.1"]);

app.listen(envConstants.PORT, async () => {
  await connectDB(envConstants.MONGO_URI);
  console.log(`Server is running on port ${envConstants.PORT}`);
});
