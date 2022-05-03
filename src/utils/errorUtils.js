const defaultErrorMessage = "An unknown error has occurred."

export const getErrorMessage = (error) => {
  return getErrorFromObject(error)?.message || defaultErrorMessage;
}

export const getErrorFromObject = (error) => {
  return error.response?.data;
}