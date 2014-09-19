﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web.UI.WebControls;
using AutoMapper;
using Nancy;
using Nancy.ModelBinding;
using Starscream.Domain.Application.Commands;
using Starscream.Domain.Entities;
using Starscream.Domain.Services;
using Starscream.Notifications;
using Starscream.Web.Api.Infrastructure;
using Starscream.Web.Api.Requests;
using Starscream.Web.Api.Requests.Admin;
using Starscream.Web.Api.Responses.Admin;

namespace Starscream.Web.Api.Modules
{
    public class AdminModule : NancyModule
    {
        public AdminModule(IReadOnlyRepository readOnlyRepository, IMappingEngine mappingEngine,
            ICommandDispatcher commandDispatcher)
        {
            Get["/users"] =
                _ =>
                    {
                        var request = this.Bind<AdminUsersRequest>();
                        var admin = new ProfileAdministrator();
                        var param = Expression.Parameter(typeof(User), "User");
                        var mySortExpression = Expression.Lambda<Func<User, object>>(Expression.Property(param, request.Field), param);
                        IQueryable<User> users =
                            readOnlyRepository.Query<User>(x => x.Profile != admin.Name).AsQueryable();

                        var orderedUsers = users.OrderBy(mySortExpression);

                        IQueryable<User> pagedUsers = orderedUsers.Skip(request.PageSize * (request.PageNumber - 1)).Take(request.PageSize);

                        List<AdminUserResponse> mappedItems = mappingEngine
                            .Map<IQueryable<User>, IEnumerable<AdminUserResponse>>(pagedUsers).ToList();

                        return new AdminUsersListResponse(mappedItems);
                    };

            Post["/users/enable"] =
                _ =>
                {
                    var request = this.Bind<AdminEnableUsersRequest>();
                    if (request.Enable)
                    {
                        commandDispatcher.Dispatch(this.UserSession(), new EnableUser(request.Id)); 
                    }
                    else
                    {
                        commandDispatcher.Dispatch(this.UserSession(), new DisableUser(request.Id));
                    }
                
                    return null;
                };
        }
    }
}