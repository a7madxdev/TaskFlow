const VerifyEmail = ({ code }: { code: string }) => {
  return (
    <div>
      <h2>Email Verification</h2>
      <p>This is your verification code:</p>
      <h1>{code}</h1>
      <p>This code is vaild for 10 minutes</p>
    </div>
  );
};

export default VerifyEmail;
