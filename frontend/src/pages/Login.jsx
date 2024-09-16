import Form from "../components/Form";

function login(){
    return <Form route="/auth/token/" method="login" />
}

export default login;