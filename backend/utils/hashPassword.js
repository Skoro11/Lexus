import bcrypt from "bcrypt"
const saltRounds=10
export async function hashPassword(plainTextPassword){

const salt= await bcrypt.genSalt(saltRounds)
const HashedPassword = await bcrypt.hash(plainTextPassword,salt);
return HashedPassword;

}

export async function checkPassword(plainTextPassword,hashedPassword){

const isPasswordCorrect = await bcrypt.compare(plainTextPassword,hashedPassword)
return isPasswordCorrect;
}
