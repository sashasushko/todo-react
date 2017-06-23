// @flow

import React from "react";

import Modal from "retail-ui/components/Modal";
import Input from "retail-ui/components/Input";
import Button from "retail-ui/components/Button";

type Props = {
  value: string,
  onClose: () => void,
  onSubmit: (value: string) => void
};

type State = {
  value: string
};

export default class EditingModal extends React.Component {
  props: Props;
  state: State;
  static defaultProps = {
    value: "",
    onClose: () => {},
    onSubmit: (value: string) => {}
  };

  constructor(props: Props) {
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
            onChange={(event: Event) => {
              if (event.target instanceof HTMLInputElement) {
                this.setState({ value: event.target.value });
              }
            }}
            onKeyDown={(event: Event) => {
              if (event.target instanceof HTMLInputElement) {
                event.key === "Enter" ? onSubmit(value) : false;
              }
            }}
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
