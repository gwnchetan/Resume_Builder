
export interface Iuser {
    _id: string,
    name: string,
    email: string,
    password: string,
    mobile: string,
    createAt?: Date,
    updateAt?: Date
}

//while register this are the values that you are going to recive from forntend 
// this are the types of register 
export interface RegisterBody{
    name: string,
    email: string,
    password: string,
    mobile: string,
}

export interface LoginBody{
    email: string,
    password: string,
    
}

// for token genration you need fetch unique values from the user it might be Id or email email is optional
export interface JWTPayload{
    userId: string,
    email?: string
}