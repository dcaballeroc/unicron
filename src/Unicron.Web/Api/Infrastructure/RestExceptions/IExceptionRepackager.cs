using System;
using Nancy;

namespace Unicron.Web.Api.Infrastructure.RestExceptions
{
    public interface IExceptionRepackager
    {
        ErrorResponse Repackage(Exception exception, NancyContext context, string contentType);
        bool CanHandle(Exception exception, string contentType);
    }
}