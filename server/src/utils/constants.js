const username = "jaiswalrishu111";
const password = "Rishu@1234";
const dbName = "mydata";

export const uri = `mongodb+srv://${encodeURIComponent(
  username
)}:${encodeURIComponent(
  password
)}@cluster1.rcebehv.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// const JWT_TOKEN_SECRET = "ahfdhjfh";

// export default JWT_TOKEN_SECRET;

export const JWT_TOKEN_SECRET = "ahfdhjfh";

export const statusCode = {
  SUCCESS: 200,
  VALIDATION_ERROR: 201,
  UNPROCESSABLE_ENTITY: 202,
  AUTH_ERROR: 203,
};
