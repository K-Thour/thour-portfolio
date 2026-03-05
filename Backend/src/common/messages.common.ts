import MESSAGES_COMMON from '../constants/messages.constant';

const unableToFetch = (entity: string) => {
  return `${MESSAGES_COMMON.error.failedToFetch} ${entity}`;
};

const unableToCreate = (entity: string) => {
  return `${MESSAGES_COMMON.error.failedToCreate} ${entity}`;
};

const unableToUpdate = (entity: string) => {
  return `${MESSAGES_COMMON.error.failedToUpdate} ${entity}`;
};

const unableToDelete = (entity: string) => {
  return `${MESSAGES_COMMON.error.failedToDelete} ${entity}`;
};

const notFound = (entity: string) => {
  return `${MESSAGES_COMMON.error.notFound} ${entity}`;
};

const fetchedSuccessfully = (entity: string) => {
  return `${MESSAGES_COMMON.success.fetchedSuccessfully} ${entity}`;
};

const createdSuccessfully = (entity: string) => {
  return `${MESSAGES_COMMON.success.createdSuccessfully} ${entity}`;
};

const updatedSuccessfully = (entity: string) => {
  return `${MESSAGES_COMMON.success.updatedSuccessfully} ${entity}`;
};

const deletedSuccessfully = (entity: string) => {
  return `${MESSAGES_COMMON.success.deletedSuccessfully} ${entity}`;
};

const invalidCredentials = (entity: string) => {
  return `${MESSAGES_COMMON.error.invalidCredentials} ${entity}`;
};

const loggedInSuccessfully = (entity: string) => {
  return `${MESSAGES_COMMON.success.loggedInSuccessfully} ${entity}`;
};

const alreadyExist = (entity: string) => {
  return `${MESSAGES_COMMON.error.alreadyExist} ${entity}`;
};

const registeredSuccessfully = (entity: string) => {
  return `${MESSAGES_COMMON.success.registeredSuccessfully} ${entity}`;
};

const MESSAGES_COMMON_UTIL = {
  unableToFetch,
  unableToCreate,
  unableToUpdate,
  unableToDelete,
  invalidCredentials,
  alreadyExist,
  notFound,
  fetchedSuccessfully,
  createdSuccessfully,
  updatedSuccessfully,
  deletedSuccessfully,
  loggedInSuccessfully,
  registeredSuccessfully,
} as const;

export default MESSAGES_COMMON_UTIL;
