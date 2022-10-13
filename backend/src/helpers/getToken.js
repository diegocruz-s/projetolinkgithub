export const getToken = (req)=>{
    const token = req.headers.authorization.split(' ')[1];
    
    return token;
}