import { Host } from '../../../types/config';
import { useConfig } from '../../hooks/useConfig';
import { Button } from '../Button';
import { Input } from '../Input';
import { Modal, ModalProps, openModal } from '../Modal';
import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';

interface AddHostModalProps extends ModalProps {
  onSubmit?: (host: Host) => void;
  defaultValues?: Partial<Host>;
  confirmButtonText?: string;
  title?: string;
}

const AddHostModal = ({
  onSubmit,
  defaultValues,
  title = 'Add host',
  confirmButtonText = 'Confirm',
  ...props
}: AddHostModalProps) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const setDefaultValues = () => {
    const keys = Object.keys(defaultValues ?? {});
    for (const key of keys) {
      const input = formRef.current?.elements[key];
      if (input) {
        input.value = defaultValues[key];
      }
    }
  };

  useEffect(() => {setDefaultValues()}, [defaultValues]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const host: Host = {
      address: e.currentTarget.elements['address'].value,
      maxTime: parseInt(e.currentTarget.elements['maxTime'].value),
      displayName: e.currentTarget.elements['displayName'].value,
      onlineDisplay: e.currentTarget.elements['onlineDisplay'].value,
      offlineDisplay: e.currentTarget.elements['offlineDisplay'].value
    };
    onSubmit?.(host);
    handleClose();
  };

  const handleClose = () => {
    props.onClose?.();
  };

  return (
    <Modal {...props}>
      <h1 className='text-lg font-bold'>{title}</h1>
      <small>Complete host information below</small>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className='flex flex-col justify-center items-center mt-6'
      >
        <div className='mt-2 w-full'>
          <Input
            name='address'
            placeholder='Address'
            className='w-full'
            required
          />
          <small className='opacity-40'>
            Host address, it can be and ip address or a hostname
          </small>
        </div>
        <div className='mt-2 w-full'>
          <Input
            name='displayName'
            placeholder='Display name'
            className='w-full'
          />
          <small className='opacity-40'></small>
        </div>
        <div className='mt-2 w-full'>
          <Input
            name='onlineDisplay'
            placeholder='Online display text'
            className='w-full'
          />
          <small className='opacity-40'>Text to display when the host is online</small>
        </div>
        <div className='mt-2 w-full'>
          <Input
            name='offlineDisplay'
            placeholder='Offline display text'
            className='w-full'
          />
          <small className='opacity-40'>Text to display when the host is offline</small>
        </div>
        <div className='mt-2 w-full'>
          <Input
            name='maxTime'
            placeholder='Max time'
            className='w-full'
            defaultValue='100'
            required
            type='number'
          />
          <small className='opacity-40'>Max time in ms to alert</small>
        </div>
        <div className='mt-6 grid grid-cols-2 gap-2 w-full'>
          <Button type='submit' className='w-full'>
            {confirmButtonText}
          </Button>
          <Button type='button' className='w-full' onClick={handleClose}>
            Close
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export const openAddHostModal = async (props?: Partial<AddHostModalProps>) => {
  const host = await openModal<Host, AddHostModalProps>(AddHostModal, props);
  return host;
};

export default AddHostModal;
