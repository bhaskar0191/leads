import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'qualified', 'lost'],
        default: 'new'
    },
    source: {
        type: String,
        enum: ['website', 'instagram', 'referral'],
        default: 'website'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})
 

// Hide password when converting to JSON
LeadSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});
const Lead = mongoose.model('Lead', LeadSchema);

export default Lead;