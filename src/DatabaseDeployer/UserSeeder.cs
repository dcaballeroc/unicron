using DomainDrivenDatabaseDeployer;
using Starscream.Domain;
using Starscream.Domain.Entities;
using Starscream.Domain.Services;
using NHibernate;

namespace DatabaseDeployer
{
    public class UserSeeder : IDataSeeder
    {
        readonly ISession _session;

        public UserSeeder(ISession session)
        {
            _session = session;
        }

        #region IDataSeeder Members

        public void Seed()
        {
            var encryptor = new HashPasswordEncryptor();
            var userEmailLogin = new UserEmailLogin("Test User", "admin@test.com", encryptor.Encrypt("password"), "615-555-1212");
            userEmailLogin.AssignProfile(new Profile("Administrator"));
            _session.Save(userEmailLogin);
            _session.Save(new UserEmailLogin("Test User", "test@test.com", encryptor.Encrypt("password"), "615-555-1212"));
        }

        #endregion
    }
}