import FormAuth from "../components/Auth/FormAuth";
// tạo page form các thực
function Auth({ setIsLogin }) {
  return (
    <>
      <FormAuth setIsLogin={setIsLogin} />
    </>
  );
}
export default Auth;
