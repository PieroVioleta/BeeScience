const mongoose = require('mongoose');

const url =  `mongodb+srv://cooper73:BeeScience@cluster0.ma4no.mongodb.net/BeeScience?retryWrites=true&w=majority`;

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));
