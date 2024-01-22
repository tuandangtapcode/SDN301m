import { Form } from "antd"

const LoginPage = () => {

  const [form] = Form.useForm()

  return (
    <div>
      <img
        style={{ width: '70px', height: '70px' }}
        src="logoApp.jpg"
        alt=""
      />
      <Form>

      </Form>
    </div>
  );
}

export default LoginPage;