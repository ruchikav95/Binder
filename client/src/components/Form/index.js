
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import {
  Form,
  Input,
  Select,
  Button,
  AutoComplete,
} from 'antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;



class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },

      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 10,
          offset: 0,
        },
        sm: {
          span: 10,
          offset: 8,
        },
      },
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 300 }}>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input style={{ width: 160 }} />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password style={{ width: 160 }} />)}
        </Form.Item>


        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    );
  }
}


const WrappedRegistrationForm = Form.create({ name: "normal_login" })(
  RegistrationForm
);
export default WrappedRegistrationForm;