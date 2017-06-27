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
  checked: boolean,
  onChange: () => void,
  onRemove: () => void
};

type Props = {|
  id: number,
  value: string,
  checked: boolean,
  onChange: (checked: boolean) => void,
  onRemove: () => void
|};

type State = {
  removeConfirm: boolean
};

export default class Item extends React.Component {
  props: Props;
  state: State = { removeConfirm: false };

  renderRemoveModal() {
    const { onRemove } = this.props;

    return (
      <Modal onClose={() => this.setState({ removeConfirm: false })}>
        <Modal.Body>
          <p>Удаленный пункт не&nbsp;восстановить. Вы&nbsp;уверены?</p>
        </Modal.Body>
        <Modal.Footer panel>
          <Gapped gap={30}>
            <Button
              autoFocus={true}
              use="danger"
              onClick={() => {
                onRemove();
                this.setState({ removeConfirm: false });
              }}
            >
              Да, удалите
            </Button>
            <Button
              use="link"
              onClick={() => this.setState({ removeConfirm: false })}
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
    const { removeConfirm } = this.state;

    return (
      <Gapped gap={20}>
        <Gapped gap={10}>
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
        </Gapped>
        <Link
          use="danger"
          icon="remove"
          onClick={() => this.setState({ removeConfirm: true })}
        >
          Удалить
        </Link>
        {removeConfirm && this.renderRemoveModal()}
      </Gapped>
    );
  }
}
