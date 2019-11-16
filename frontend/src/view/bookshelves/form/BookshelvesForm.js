import { Button, Form } from 'antd';
import { Formik } from 'formik';
import { i18n } from 'i18n';
import model from 'modules/bookshelves/bookshelvesModel';
import React, { Component } from 'react';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import Spinner from 'view/shared/Spinner';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import FormSchema from 'view/shared/form/formSchema';
import UserAutocompleteFormItem from 'view/iam/autocomplete/UserAutocompleteFormItem';

const { fields } = model;

class BookshelvesForm extends Component {
  schema = new FormSchema(fields.id, [
    fields.bsBookName,
    fields.bsSubjec,
    fields.bsBookOwner,
  ]);

  handleSubmit = (values) => {
    const { id, ...data } = this.schema.cast(values);
    this.props.onSubmit(id, data);
  };

  initialValues = () => {
    const record = this.props.record;
    return this.schema.initialValues(record || {});
  };

  renderForm() {
    const { saveLoading, isEditing } = this.props;

    return (
      <FormWrapper>
        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.schema.schema}
          onSubmit={this.handleSubmit}
          render={(form) => {
            return (
              <Form onSubmit={form.handleSubmit}>
                {isEditing && (
                  <ViewFormItem
                    name={fields.id.name}
                    label={fields.id.label}
                  />
                )}

                <UserAutocompleteFormItem
                  name={fields.bsBookName.name}
                  label={fields.bsBookName.label}
                  required={fields.bsBookName.required}
                  showCreate={!this.props.modal}
                  form={form}
                  mode="multiple"
                />
                <UserAutocompleteFormItem
                  name={fields.bsSubjec.name}
                  label={fields.bsSubjec.label}
                  required={fields.bsSubjec.required}
                  showCreate={!this.props.modal}
                  form={form}
                  mode="multiple"
                />
                <UserAutocompleteFormItem
                  name={fields.bsBookOwner.name}
                  label={fields.bsBookOwner.label}
                  required={fields.bsBookOwner.required}
                  showCreate={!this.props.modal}
                  form={form}
                  mode="multiple"
                />

                <Form.Item
                  className="form-buttons"
                  {...tailFormItemLayout}
                >
                  <Button
                    loading={saveLoading}
                    type="primary"
                    onClick={form.handleSubmit}
                    icon="save"
                  >
                    {i18n('common.save')}
                  </Button>

                  <Button
                    disabled={saveLoading}
                    onClick={form.handleReset}
                    icon="undo"
                  >
                    {i18n('common.reset')}
                  </Button>

                  {this.props.onCancel ? (
                    <Button
                      disabled={saveLoading}
                      onClick={() => this.props.onCancel()}
                      icon="close"
                    >
                      {i18n('common.cancel')}
                    </Button>
                  ) : null}
                </Form.Item>
              </Form>
            );
          }}
        />
      </FormWrapper>
    );
  }

  render() {
    const { isEditing, findLoading, record } = this.props;

    if (findLoading) {
      return <Spinner />;
    }

    if (isEditing && !record) {
      return <Spinner />;
    }

    return this.renderForm();
  }
}

export default BookshelvesForm;
