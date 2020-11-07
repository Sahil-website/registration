const loginInputs = [
{
  label: "User Name",
  type: "text",
  show: true,
  validated: "",
  id: "a" },
{
  label: "Password",
  type: "password",
  show: true,
  validated: "",
  id: "b" }];



const signupInputs = [
{
  label: "User Name",
  type: "text",
  show: false,
  validated: "",
  id: "c" },
{
  label: "Email",
  type: "email",
  show: false,
  validated: "",
  id: "d" },
{
  label: "Password",
  type: "password",
  show: false,
  validated: "",
  id: "e" },
{
  label: "Re-Enter Password",
  type: "password",
  show: false,
  validated: "",
  id: "f" }];



const LoginWrapper = React.createClass({ displayName: "LoginWrapper",

  getInitialState() {
    return {
      signUp: false,
      signupInputs: signupInputs,
      loginInputs: loginInputs };

  },

  inUpClick() {
    this.setState({ signUp: !this.state.signUp });
    this.animateFields("signupInputs");
    setTimeout(() => {this.animateFields("loginInputs");}, 100);
  },

  animateFields(formName) {
    let start, length, newForm;

    if (formName === "loginInputs") {
      newForm = this.state.loginInputs.slice();
    } else if (formName === "signupInputs") {
      newForm = this.state.signupInputs.slice();
    }

    start = 0;
    length = newForm.length;

    console.log(newForm);

    let stagger = i => {
      if (i < length) {
        setTimeout(() => {
          newForm[i].show = !newForm[i].show;
          this.setState({ [formName]: newForm });
          stagger(i + 1);
        }, 70);
      }
    };
    stagger(start);
  },

  submitForm(e) {
    e.preventDefault();
  },

  validateField(event, id) {
    let newState, fieldInState;
    const value = event.target.value;

    const getField = (field) =>
    field.id === id;


    const validate = (v) =>
    v.length > 0;


    if (this.state.signUp === true) {
      newState = this.state.signupInputs.slice();
      fieldInState = newState.find(getField);

      fieldInState.validated = validate(value) ? true : false;
      this.setState({ signupInputs: newState });
    } else
    {
      newState = this.state.loginInputs.slice();
      fieldInState = newState.find(getField);

      fieldInState.validated = validate(value) ? true : false;
      this.setState({ loginInputs: newState });
    }
  },

  render() {

    return (
      React.createElement("div", null,
      React.createElement(Login, {
        signUp: this.state.signUp,
        inputs: this.state.loginInputs,
        inUpClick: this.inUpClick,
        submitForm: this.submitForm,
        validateField: this.validateField }),


      React.createElement(SignUp, {
        signUp: this.state.signUp,
        inputs: this.state.signupInputs,
        inUpClick: this.inUpClick,
        submitForm: this.submitForm,
        validateField: this.validateField })));



  } });


const Login = ({
  inputs,
  signUp,
  inUpClick,
  submitForm,
  validateField }) =>

React.createElement("div", { className: signUp ? "login login-closed" : "login" },
React.createElement("h1", null, "Log In"),
React.createElement("hr", null),
React.createElement(Form, {
  inputs: inputs,
  submitForm: submitForm,
  validateField: validateField }),

React.createElement(SignupLink, { inUpClick: inUpClick }));



const SignUp = ({
  inputs,
  signUp,
  inUpClick,
  submitForm,
  validateField }) =>

React.createElement("div", {
  className: signUp ?
  "sign-up" :
  "sign-up sign-up-closed" },

React.createElement("h1", null, "Sign Up"),
React.createElement("hr", null),
React.createElement(Form, {
  inputs: inputs,
  submitForm: submitForm,
  validateField: validateField }),

React.createElement(LoginLink, { inUpClick: inUpClick }));



const Form = ({
  inputs,
  submitForm,
  validateField }) =>
{
  const inputsMapped = inputs.map((i) =>
  React.createElement(Input, {
    label: i.label,
    type: i.type,
    show: i.show,
    validated: i.validated,
    id: i.id,
    validateField: validateField }));



  return (
    React.createElement("form", { onSubmit: submitForm },
    inputsMapped,
    React.createElement(Submit, null)));


};

const Submit = () =>
React.createElement("div", null,
React.createElement("hr", null),
React.createElement("button", {
  className: "submit-button",
  type: "submit" }, " Submit"));





const Input = ({
  label,
  type,
  show,
  validated,
  id,
  validateField }) =>

React.createElement("div", { className: show ? "field field-in" : "field" },
React.createElement("label", { className: "label" }, label,
React.createElement("i", {
  className: validated ?
  "fa fa-check animate-check" :
  "",
  "aria-hidden": "true" })),


React.createElement("br", null),
React.createElement("input", {
  className: "input",
  type: type,
  onBlur: () => {validateField(event, id);} }));




const SignupLink = ({ inUpClick }) =>
React.createElement("div", { className: "signup-link" },
React.createElement("p", { className: "in-out" }, "Don't have an account? ",
" ",
React.createElement("a", { href: "#", onClick: inUpClick }, "Sign Up Here")));




const LoginLink = ({ inUpClick }) =>
React.createElement("div", { className: "signup-link" },
React.createElement("p", { className: "in-out" }, "Already have an account? ",
" ",
React.createElement("a", { href: "#", onClick: inUpClick }, "Log In Here")));




ReactDOM.render(
React.createElement(LoginWrapper, null),
document.getElementById('login-signup'));