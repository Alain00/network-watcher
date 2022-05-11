import { Host } from "../../../types/config";
import { useConfig } from "../../hooks/useConfig";
import { Button } from "../Button";
import { Input } from "../Input";
import { Modal, ModalProps } from "../Modal";
import ReactDOM from 'react-dom';

interface AddHostModalProps extends ModalProps {
  onSubmit?: (host: Host) => void;
}

const AddHostModal = ({
  onSubmit,
  ...props
} : AddHostModalProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const host : Host = {
      address: e.currentTarget.elements['address'].value,
    }
    onSubmit?.(host);
    handleClose();
  }

  const handleClose = () => {
    props.onClose?.();
  }

  return (
    <Modal {...props}>
      <h1 className="text-lg font-bold">Add Host</h1>
      <small>Add host information below</small>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center mt-6">
        <Input name="address" placeholder="Address" className="w-full" required />
        <div className="mt-6 grid grid-cols-2 gap-2 w-full">
          <Button type="submit" className="w-full">
            Add
          </Button>
          <Button type='button' className="w-full" onClick={handleClose}>
            Close
          </Button>
        </div>
      </form>
    </Modal>
  )
}

const open = async () => {
  const host = await new Promise<Host | undefined>((resolve) => {
    const container = document.createElement('div')
    container.setAttribute('id', 'notification-container')
    document.body.appendChild(container)
  
    const handleClose = () => {
      ReactDOM.unmountComponentAtNode(container)
      container.remove()
      resolve(undefined);
    }
  
    const handleSubmit = (host: Host) => {
      resolve(host);
    }

    ReactDOM.render(
      <AddHostModal open onClose={handleClose} onSubmit={handleSubmit} />,
      container
    )
  })
  return host;
}


AddHostModal.open = open;

export default AddHostModal;