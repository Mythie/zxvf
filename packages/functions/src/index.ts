import { initializeApp } from 'firebase-admin/app';

initializeApp();

export { createProduct } from './handlers/createProduct';
export { createProductGroup } from './handlers/createProductGroup';
export { createDevice } from './handlers/createDevice';
