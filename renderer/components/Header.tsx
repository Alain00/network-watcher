import { useRef } from "react";
import { useConfig } from "../hooks/useConfig";
import { useHotkeys } from "../hooks/useHotkeys";
import AddHostModal, { openAddHostModal } from "./AddHostModal/AddHostModal";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { openSearchModal } from "./SearchModal";

export interface HeaderProps {
  onSearchChange?: (value: string) => void;
}

export const Header = ({
  onSearchChange,
}: HeaderProps) => {
  const config = useConfig()
  const searchOpen = useRef(false)

  const handleOpenAddHostWindow = async () => {
    const host = await openAddHostModal();
    if (!host) return;
    config.addHost(host);
  }

  const toggleCompact = () => {
    config.updateCompact(!config.config.compact);
  }

  const handleOpenSearchModal = async () => {
    if (searchOpen.current === true) return;
    
    searchOpen.current = true;
    await openSearchModal(onSearchChange);
    onSearchChange('');
    searchOpen.current = false;
  }

  useHotkeys('control+f', handleOpenSearchModal);
  
  return (
    <div className="flex p-4 gap-2">
      <Button onClick={handleOpenAddHostWindow} variant='secondary'>
        <Icon name="plus" />
      </Button>
      <Button onClick={toggleCompact} variant='secondary'>
        <Icon type={config.config.compact ? 'sr' : 'rr'} name="apps" />
      </Button>
      <Button onClick={handleOpenSearchModal} variant='secondary'>
        <Icon name="search" />
      </Button>
    </div>
  )
}