using System;
using System.Collections.Generic;
using IvoryTower.Domain.Entities;

namespace IvoryTower.Domain.Services
{
    public interface IWriteableRepository
    {
        void Delete<T>(Guid itemId) where T : IEntity;
        T Update<T>(T itemToUpdate) where T : IEntity;
        T Create<T>(T itemToCreate) where T : IEntity;
        void DeleteAll<T>() where T : class, IEntity;
        IEnumerable<T> CreateAll<T>(IEnumerable<T> list) where T : IEntity;
    }
}