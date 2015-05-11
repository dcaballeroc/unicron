/// <reference path="../../../../typings/mocha/mocha.d.ts" />
/// <reference path="../../../../typings/chai/chai.d.ts" />
/// <reference path="../../../../typings/sinon/sinon.d.ts" />
/// <reference path="../../../../typings/sinon-chai/sinon-chai.d.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../app/common/httpq/httpQ.service.ts"/>
/// <reference path="../../../app/users/activateDeactivateUsers/users.activate-deactivate.service.ts"/>
/// <reference path="../../../app/users/activateDeactivateUsers/users.activate-deactivate.controller.ts"/>
/// <reference path="../../../app/users/users/users.service.ts"/>


/* tslint:disable:typedef */
describe('users.activate-deactivate.controller', () => {
    var usersActivateDeactivateUsersController: IUsersActivateDeactivateContoller;
    var $scope: IUsersActivateDeactivateScope;
    var $rootScope: angular.IRootScopeService;
    var $q: angular.IQService;
    var usersPromise: angular.IPromise<IUserResponse[]>;
    var $httpBackend: angular.IHttpBackendService;
    var userServiceMock: IUsersService;
    var users: IUserResponse[] = [
        {
            id: 'id1', name: 'user1', email: 'email1'
        },
        {
            id: 'id2', name: 'user2', email: 'email2'
        }
    ];
    beforeEach(function() {
        userServiceMock = {
            getUser: function(id: string): angular.IPromise<IUserResponse> {
                return undefined;
            },
            getPagedUsers: function(payload: IUserPagedRequest): angular.IPromise<IUserResponse[]> {
                return undefined;
            }
        }
    });
    beforeEach(angular.mock.module('app.users'));
    beforeEach(inject(function($controller: angular.IControllerService,
        _$rootScope_: angular.IRootScopeService,
        _$q_: angular.IQService,
        _usersActivateDeactivateService_: IActivateDeactivateUsersService) {
        $q = _$q_;
        usersPromise = getUsersPromise($q);
        sinon.stub(userServiceMock, 'getPagedUsers').returns(usersPromise);
        $rootScope = _$rootScope_;
        $scope = <IUsersActivateDeactivateScope>$rootScope.$new();
        usersActivateDeactivateUsersController = $controller('users.activate-deactivate.controller'
            , { $scope: $scope, usersService: userServiceMock });


    }));
    it('Should be register as users.activate-deactivate.controller', function() {
        chai.expect(usersActivateDeactivateUsersController).to.be.not.undefined;
    });
    describe('when is created', () => {
        it('Should set ordered by name by default ', () => {
            chai.expect(usersActivateDeactivateUsersController.orderedByName).to.be.true;
            chai.expect(usersActivateDeactivateUsersController.orderedByEmail).to.be.false;
        });
        it('Should set initial page size to 20', () => {
            chai.expect(usersActivateDeactivateUsersController.pageSize).to.be.eq(20);
        })
        it('Should set initial page to 1', () => {
            chai.expect(usersActivateDeactivateUsersController.pageNumber).to.be.eq(1);
        });
        it('Should retrieve the users from the service', () => {
            $rootScope.$apply();
            var usersRetrived = usersActivateDeactivateUsersController.users;
            chai.expect(usersRetrived).to.not.be.undefined;
            chai.expect(usersRetrived).to.be.deep.equal(users);
        });
    });
    function getUsersPromise($q: angular.IQService): angular.IPromise<IUserResponse[]> {
        var deferred = $q.defer<IUserResponse[]>();
        deferred.resolve(users);
        return deferred.promise;
    }
});
