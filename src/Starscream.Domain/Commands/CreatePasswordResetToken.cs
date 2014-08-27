namespace Starscream.Domain.Commands
{
    public class CreatePasswordResetToken
    {
        public string Email { get; private set; }

        public CreatePasswordResetToken(string email)
        {
            Email = email;
        }
    }
}