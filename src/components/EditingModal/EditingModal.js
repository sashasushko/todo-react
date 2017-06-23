import React from "react";
import PropTypes from "prop-types";

import Modal from "retail-ui/components/Modal";
import Input from "retail-ui/components/Input";
import Button from "retail-ui/components/Button";

export default class EditingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  render() {
    const { value } = this.state;
    const { onClose, onSubmit } = this.props;

    return (
      <Modal width={360} onClose={() => onClose()}>
        <Modal.Body>
          <Input
            width="100%"
            autoFocus={true}
            value={value}
            onChange={event => this.setState({ value: event.target.value })}
            onKeyDown={event =>
              event.key === "Enter" ? onSubmit(value) : false}
          />
        </Modal.Body>
        <Modal.Footer panel>
          <Button use="primary" onClick={() => onSubmit(value)}>
            Изменить
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

EditingModal.propTypes = {
  value: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func
};

EditingModal.defaultProps = {
  onClose: () => {},
  onSubmit: () => {}
};
