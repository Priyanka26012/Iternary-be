import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserSchema } from './src/users/schema/user.schema'

const connectDB = async () => {
  await mongoose.connect('mongodb+srv://nitinshukla:3v12PsVCjHEJPq0W@cluster0.hwwk7wt.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions);
};

const createUser = async (username: string, password: string) => {
  const UserModel = mongoose.model('users', UserSchema);
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();
  console.log('User created successfully');
};

const run = async () => {
    console.log("hello")
  await connectDB();
  await createUser('testuser', 'password123');
  mongoose.connection.close();
};

run().catch(err => console.error(err));
