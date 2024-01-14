import mongoose from 'mongoose';

const connect = async () => {

  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/comic_online', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connect successfully!!');
  } catch (error) {
    console.log('Connect failures!!');
  }

}

module.exports = { connect };
