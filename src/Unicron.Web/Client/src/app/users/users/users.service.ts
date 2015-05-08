/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../users.module.ts" />

interface IUserPagedRequest {
    pageNumber: number;
    pageSize: number;
    field: number;
}

interface IUserResponse {
  id: string;
  name: string;
  email: string;
}

interface IUsersService {
    getPagedUsers(payload: IUserPagedRequest): IUserLoginResponse;
    getUser(id: string): IUserLoginResponse;
}

class UsersService implements IUsersService {

  static $inject: any = ['httpq'];
  /*@ngInject*/
  constructor(private httpq: IHttpQ) {
  }
  getPagedUsers(payload: IUserPagedRequest): IUserLoginResponse {
    return undefined;
  }
  getUser(id: string): IUserLoginResponse {
    return undefined;
  }
}

appUsers.factory('usersService', ['httpq', (httpq: IHttpQ) => new UsersService(httpq)]);
