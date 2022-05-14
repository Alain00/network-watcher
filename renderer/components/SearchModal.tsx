import { useHotkeys } from '../hooks/useHotkeys';
import { AnimationPresence } from './AnimationPresence';
import { Button } from './Button';
import { Icon } from './Icon';
import { Input } from './Input';
import { openModal } from './Modal';

interface SearchModalProps {
  onSubmit?: (value: string) => void;
  onChange?: (value: string) => void;
  onClose?: () => void;
}

export const SearchModal = ({
  onChange,
  onSubmit,
  onClose,
}: SearchModalProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e.currentTarget.elements['search'].value);
    onClose?.();
  };

  useHotkeys('escape', onClose);
  useHotkeys('control+f', onClose);

  return (
    <AnimationPresence
      className="transition duration-400"
      unmountClassName={'opacity-0 -translate-y-4'}
      mountClassName={'opacity-100'}
    >
      <div className='fixed left-0 right-0 top-0 flex justify-center items-start'>
        {/* <div className="absolute inset-0 bg-gray-900 opacity-10" /> */}
        <form onSubmit={handleSubmit} className='shadow-xl mt-4 z-10 flex flex-col'>
          <Button
            variant="transparent"
            type='button'
            onClick={onClose}
          >
            <Icon name="cross" className="mb-4" />
          </Button>
          <Input
            autoFocus
            className="rounded-full"
            name='search'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
      </div>
    </AnimationPresence>
  );
};

export const openSearchModal = async (onChange: (value?: string) => void) => {
  const waitForSubmit = openModal<string>(SearchModal, {
    onChange,
  });

  return waitForSubmit;
};
