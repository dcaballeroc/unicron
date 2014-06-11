﻿using AcklenAvenue.Testing.Moq.ExpectedObjects;
using IvoryTower.Domain.CommandHandlers;
using IvoryTower.Domain.Commands;
using IvoryTower.Domain.DomainEvents;
using IvoryTower.Domain.Entities;
using IvoryTower.Domain.Services;
using IvoryTower.Domain.ValueObjects;
using Machine.Specifications;
using Moq;
using It = Machine.Specifications.It;

namespace IvoryTower.Domain.Specs
{
    public class when_creating_a_new_user
    {
        static CreateUser _command;
        static IWriteableRepository _writeableRepository;
        static ICommandHandler _handler;
        static UserCreated _expectedEvent;
        static object _eventRaised;

        Establish context =
            () =>
                {
                    _command = new CreateUser("email", new EncryptedPassword("password"), "name", "password");
                    _writeableRepository = Mock.Of<IWriteableRepository>();
                    _handler = new UserCreator(_writeableRepository);

                    _expectedEvent = new UserCreated(_command.Email, _command.Name, _command.PhoneNumber);
                    _handler.NotifyObservers += x => _eventRaised = x;
                };

        Because of =
            () => _handler.Handle(Mock.Of<IUserSession>(), _command);

        It should_create_the_new_user =
            () => Mock.Get(_writeableRepository).Verify(
                x =>
                x.Create(
                    WithExpected.Object(new User(_command.Name, _command.Email, _command.EncryptedPassword,
                                                 _command.PhoneNumber))));

        It should_handle_the_expected_event =
            () => _handler.CommandType.ShouldEqual(_command.GetType());

        It should_throw_the_expected_event =
            () => _eventRaised.ShouldBeLike(_expectedEvent);
    }
}