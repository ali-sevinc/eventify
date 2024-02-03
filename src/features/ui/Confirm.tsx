import Button from "./Button";
import Modal from "./Modal";
type PropsType = {
  title: string;
  message: string;
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
};
export default function Confirm({
  title,
  message,
  onClose,
  onDelete,
  open,
}: PropsType) {
  return (
    <Modal onClose={onClose} open={open}>
      <div className="flex flex-col gap-2 text-gray-50">
        <h2 className="text-2xl">{title}</h2>
        <p>{message}</p>
        <div className="flex gap-4 justify-end">
          <Button type="button" model="txt" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onDelete} type="button" model="btn">
            Proceed
          </Button>
        </div>
      </div>
    </Modal>
  );
}
