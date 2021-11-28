// Email validation
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Allows space between words not ar the beginning and end.
// Valid: 'Sachin Ramesh Tendulkar', 'Sourav Ganguly', 'Sachin' | Invalid: ' Sachin Tendulkar', 'Sourav Ganguly '"
export const nameRegex = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/;
