using System;
using System.Reflection;
using System.Threading.Tasks;
using BlingBag;
using Starscream.Domain;

namespace Starscream.Web.Api.Infrastructure.Configuration
{
    public class BlingConfigurator : IBlingConfigurator<DomainEvent>
    {
        readonly IBlingDispatcher _dispatcher;

        public BlingConfigurator(IBlingDispatcher dispatcher)
        {
            _dispatcher = dispatcher;
        }

        #region IBlingConfigurator<DomainEvent> Members

        public Func<EventInfo, bool> EventSelector
        {
            get { return x => x.EventHandlerType == typeof(DomainEvent); }
        }

        public DomainEvent HandleEvent
        {
            get { return x =>
                         {
                             try
                             {
                                 _dispatcher.Dispatch(x);
                             }
                             catch (Exception ex)
                             {
                                 //in an event queue, any exception would not affect this web server,
                                 //so, to simulate an event queue and prevent us from depending on
                                 //exception behavior generated by event handlers, this "catch" 
                                 //intentionally does nothing. -Byron
                             }
                         }; }
        }

        #endregion
    }
}