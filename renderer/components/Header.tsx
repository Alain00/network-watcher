import { useConfig } from "../hooks/useConfig";
import AddHostModal from "./AddHostModal/AddHostModal";
import { Button } from "./Button";
import { Icon } from "./Icon";

export const Header = () => {
  const config = useConfig()

  const handleOpenAddHostWindow = async () => {
    const host = await AddHostModal.open();
    if (!host) return;
    config.addHost(host);
  }

  const toggleCompact = () => {
    config.updateCompact(!config.config.compact);
  }

  return (
    <div className="flex p-4 gap-2">
      <Button onClick={handleOpenAddHostWindow}>
        <Icon name="plus" />
      </Button>
      <Button onClick={toggleCompact}>
        <Icon type={config.config.compact ? 'sr' : 'rr'} name="apps" />
      </Button>
    </div>
  )
}