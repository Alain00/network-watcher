import { useConfig } from "../hooks/useConfig";
import AddHostModal from "./AddHostModal/AddHostModal";
import { Button } from "./Button";

export const Header = () => {
  const config = useConfig()

  const handleOpenAddHostWindow = async () => {
    const host = await AddHostModal.open();
    if (!host) return;
    config.addHost(host);
  }

  return (
    <div className="p-4">
      <Button onClick={handleOpenAddHostWindow}>
        +
      </Button>
    </div>
  )
}