import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    id: {
        type: 'string', 
        required: true
    },
    departure: {
        type: 'date',
        required: true,
      },
      arrival: {
        type: 'date',
        required: true,
      },
    departureDate: {
        type: 'string', 
        required: true
    },
    returnDate: {
        type: 'string', 
        required: true
    },
    adult: {
        type: 'boolean',
        required: true,
      },
    children: {
        type: 'string', 
        required: true
    },
    class: {
        type: 'string', 
        required: true
    },
    priceRange: {
        type: 'string', 
        required: true
    }
});

const userModel = mongoose.model('users', userSchema);

const appUserSchema = new mongoose.Schema({
    id: {
        type: 'string', 
        required: true
    },
    name: {
        type: 'string', 
        required: true
    },
    email: {
        type: 'string', 
        required: true
    },
    password: {
        type: 'string', 
        required: true
    },
    role: {
        type: 'string', 
        required: true
    }

});

const AppUserModel = mongoose.model('app-users', appUserSchema);

export { userModel, AppUserModel };