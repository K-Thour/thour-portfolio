import app from './app';
import envConstants from './constants/env.constant';
import connectDB from './database/mongodb';

app.listen(envConstants.PORT, async () => {
  await connectDB(envConstants.MONGO_URI);
  console.log(`Server is running on port ${envConstants.PORT}`);
});
