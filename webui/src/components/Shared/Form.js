import PropTypes from 'prop-types';
import { Component } from 'react';

import { media, shadows } from 'helpers/style-utils';
import styled from 'styled-components';

import JsonSchemaForm from 'react-jsonschema-form';

import Button from './Button';
import Confirm from './Confirm';
import Modal from './Modal';
import Spinner from './Spinner';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  postion: relative;
  width: ${p => p.width || `1050px`};
  background: ${p => p.theme.surfaceContainerHigh};
  color: ${p => p.theme.onSurface};
  border-radius: 8px;
  border: 1px solid ${p => p.theme.outline};
  overflow: hidden;

  ${media.mobile`
    width: calc(100vw - 2rem);
  `}


  box-shadow: ${shadows.xl};
`

const Header = styled.div`
  display: flex;
  justify-content: flex-start;

  padding: 1rem;  
  font-size: 1rem;
    background: ${p => p.theme.surfaceContainerLowest};

  color: ${p => p.theme.onSurface};
`

const Body = styled.div`
  padding: 2rem;  
  font-size: 14px;
  background: ${p => p.theme.surfaceContainerLowest};
    color: !${p => p.theme.onSurface};


  height: ${p => p.height || `500px`};
  ${media.mobile`
    height: calc(100vh - 16rem);
  `}

  overflow: auto;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  padding: 1rem;
    background: ${p => p.theme.surfaceContainerHigh};
  color: ${p => p.theme.onSurface};

`

/* We can UI design with styled-componented. Later! */
const REQUIRED_FIELD_SYMBOL = "*";

const CustomTitleField = props => {
  const { id, title, required } = props;
  const legend = required ? title + REQUIRED_FIELD_SYMBOL : title;
  return <legend id={id}>{legend}</legend>;

};

const fields = {
  TitleField: CustomTitleField,
};

function Label(props) {
//  modified by acetcom
//  const { label, required, id } = props;
  const { label, id } = props;
  const required = 0;
  if (!label) {
    // See #312: Ensure compatibility with old versions of React.
    return <div />;
  }
  return (
    <label className="control-label" htmlFor={id}>
      {required ? label + REQUIRED_FIELD_SYMBOL : label}
    </label>
  );
}

const CustomFieldTemplate = props => {
  const {
    id,
    classNames,
    label,
    children,
    errors,
    help,
    description,
    hidden,
    required,
    displayLabel,
  } = props;

  if (hidden) {
    return children;
  }

  return (
    <div className={classNames}>
      {displayLabel && <Label label={label} required={required} id={id} />}
      {displayLabel && description ? description : null}
      {children}
      {errors}
      {help}
    </div>
  );
}

const transformErrors = errors => {
  return errors.map(error => {
    // use error messages from JSON schema if any
    if (error.schema.messages && error.schema.messages[error.name]) {
      return {
        ...error,
        message: error.schema.messages[error.name]
      };
    }
    return error;
  });
};

class Form extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    schema: PropTypes.object,
    uiSchema: PropTypes.object,
    formData: PropTypes.object,
    isLoading: PropTypes.bool,
    valdate: PropTypes.func,
    onHide: PropTypes.func,
    onSubmit: PropTypes.func,
    onError: PropTypes.func
  };

  static defaultProps = {
    visible: false,
    title: ""
  };

  state = {};

  componentWillReceiveProps(nextProps) {
    if (this.props.visible === false && nextProps.visible === true) {
      // Initialize State Variable when form view is visible for the first time
      this.setState({ 
        formData: nextProps.formData,
        disabled: false,
        editing: false,
        confirm: false,
        disableSubmitButton: true
      })
    }
  }

  handleChange = data => {
    const {
      onChange
    } = this.props;

    let formDataChanged = null;  
    if (onChange) {
       formDataChanged = onChange(data.formData);
    }
    this.setState({
      editing: true,
      disableSubmitButton: (Object.keys(data.errors).length > 0),
      formData: formDataChanged ? formDataChanged : data.formData
    })
  }

  handleSubmit = data => {
    const {
      onSubmit
    } = this.props;

    onSubmit(data.formData);
  }

  handleSubmitButton = () => {
    this.setState({
      disabled: true,
      disableSubmitButton: true
    })
    this.submitButton.click();
  }

  handleOutside = () => {
    const {
      onHide
    } = this.props;

    if (this.state.editing === true) {
      this.setState({ confirm: true })
    } else {
      onHide();
    }
  }

  handleClose = () => {
    const {
      onHide
    } = this.props;

    this.setState({ confirm: false })
    onHide();
  }

  render() {
    const {
      handleChange,
      handleSubmit,
      handleSubmitButton,
      handleOutside,
      handleClose
    } = this;

    const {
      visible,
      title,
      schema,
      uiSchema,
      isLoading,
      validate,
      onSubmit,
      onError
    } = this.props;

    const {
      disabled,
      disableSubmitButton,
      formData
    } = this.state;

    return (
      <div>
        <Modal 
          visible={visible} 
          onOutside={handleOutside}
          disableOnClickOutside={this.state.confirm}>
          <Wrapper id='nprogress-base-form' width={this.props.width}>
            <Header>
              {title}
            </Header>
            <Body height={this.props.height}>
              {isLoading && <Spinner/>}
              {!isLoading && 
                <JsonSchemaForm
                  schema={schema}
                  uiSchema={
                    disabled ? {
                      "ui:disabled": true,
                      ...uiSchema
                    } : {
                      ...uiSchema
                    }
                  }
                  formData={formData}
                  disableSubmitButton={disableSubmitButton}
                  fields={fields}
                  FieldTemplate={CustomFieldTemplate}
                  liveValidate
                  validate={validate}
                  showErrorList={false}
                  transformErrors={transformErrors}
                  autocomplete="off"
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  onError={onError}>
                  <div>
                    <button type="submit" ref={(el => this.submitButton = el)}/>
                    <style jsx>{`
                      button {
                        display: none;
                      }
                    `}</style>
                  </div>
                </JsonSchemaForm>
              }
            </Body>
            <Footer>
              <Button secondary disabled={disabled} onClick={handleClose}>
                CANCEL
              </Button>
              <Button primary disabled={disabled || disableSubmitButton} onClick={handleSubmitButton}>
                SAVE
              </Button>
            </Footer>
          </Wrapper>  
        </Modal>
        <Confirm 
          visible={this.state.confirm} 
          message="You have unsaved changes. Are you sure you want to close?"
          buttons={[
            { text: "Stay", action: () => this.setState({ confirm: false })},
            { text: "Close", action: handleClose, primary:true }
          ]}/>
      </div>
    )
  }
}

export default Form;
