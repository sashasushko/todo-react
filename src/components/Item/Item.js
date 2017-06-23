// @flow

import React from "react";
import { Link as RouterLink } from "react-router-dom";

import styles from "./Item.less";

import Gapped from "retail-ui/components/Gapped";
import Modal from "retail-ui/components/Modal";
import Checkbox from "retail-ui/components/Checkbox";
import Button from "retail-ui/components/Button";
import Link from "retail-ui/components/Link";

type DefaultProps = {
  removable: boolean,
  checked: boolean,
  onChange: () => void,
  onRemove: () => void
};

type Props = {
  id: number,
  value: string,
  removable: boolean,
  checked: boolean,
  onChange: (checked: boolean) => void,
  onRemove: () => void
};

type State = {
  removable: boolean
};

export default class Item extends React.Component<DefaultProps, Props, State> {
  state = { removable: false };

  static defaultProps = {
    removable: false,
    checked: false,
    onChange: () => {},
    onRemove: () => {}
  };

  // ???
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ removable: nextProps.removable });
  // }

  renderRemoveModal() {
    const { onRemove } = this.props;

    return (
      // ???
      <Modal onClose={() => this.setState({ removable: false })}>
        <Modal.Body>
          <p>Удаленный пункт не&nbsp;восстановить. Вы&nbsp;уверены?</p>
        </Modal.Body>
        <Modal.Footer panel>
          <Gapped gap={30}>
            <Button
              use="danger"
              onClick={() => {
                onRemove();
                this.setState({ removable: false });
              }}
            >
              Да, удалите
            </Button>
            <Button
              use="link"
              onClick={() => this.setState({ removable: false })}
            >
              Нет, не удаляйте
            </Button>
          </Gapped>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    const { id, checked, value, onChange } = this.props;
    const { removable } = this.state;

    return (
      <Gapped gap={20}>
        <div>
          <Checkbox
            checked={checked}
            onChange={(event: Event) => {
              if (event.target instanceof HTMLInputElement) {
                onChange(event.target.checked);
              }
            }}
          />
          <RouterLink className={styles.link} to={"/edit/" + id}>
            {value}
          </RouterLink>
        </div>
        {/* ??? */}
        <Link
          use="danger"
          icon="remove"
          onClick={() => this.setState({ removable: true })}
        >
          Удалить
        </Link>
        {removable && this.renderRemoveModal()}
      </Gapped>
    );
  }
}
