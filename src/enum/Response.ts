enum Response {
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}

export type ResponseKey = keyof typeof Response;

export default Response;
