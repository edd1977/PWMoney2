import { User, Users, Transactions } from 'app/model/model';
import { IApp } from './classes';


export const selectCurrentUser = (state: IApp) => state.currentUser;
export const selectTransactions = (state: IApp) => state.transactions;
export const selectUsers = (state: IApp) => state.users;