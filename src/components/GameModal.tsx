interface GameModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    primaryButtonLabel: string;
    secondaryButtonLabel: string;
    onPrimaryButtonClick: () => void;
    onSecondaryButtonClick: () => void;
}

const GameModal: React.FC<GameModalProps> = ({
    isOpen,
    title,
    message,
    primaryButtonLabel,
    secondaryButtonLabel,
    onPrimaryButtonClick,
    onSecondaryButtonClick,
}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{title}</h2>
                <p>{message}</p>
                <div className="modal-buttons">
                    <button onClick={onPrimaryButtonClick}>
                        {primaryButtonLabel}
                    </button>
                    <button onClick={onSecondaryButtonClick}>
                        {secondaryButtonLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameModal;
