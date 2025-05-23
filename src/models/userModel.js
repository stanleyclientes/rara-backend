import mongoose from 'mongoose'
import argon2 from 'argon2'

// Definindo o esquema do usuário
const userSchema = new mongoose.Schema({
    name: { type: String, required: false },
    whatsapp: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    password: { type: String, required: false },
    gender: { type: String, required: false },
    birthdate: { type: String, required: false },
    igreja: { type: String, required: false },
    endereco: { type: String, required: false },
    status: { type: String, required: false },
    token: { type: String, required: false },
    resetPasswordToken: { type: String, required: false },
    resetPasswordExpires: { type: Date, required: false },
    batizado: { type: String, required: false },
    admin: { type: String, required: false },
    reset: {
        type: [String],
        default: []
    },
    start: {
        type: [String],
        default: []
    },
    cdv: {
        type: [String],
        default: []
    },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await argon2.hash(this.password);
    next();
});

// Verifica se o modelo já foi definido
const UserModel = mongoose.models.usuarios || mongoose.model('usuarios', userSchema);

export default UserModel;
