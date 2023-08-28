interface MenuProps {
    onStartGame: () => void;
}

const Menu: React.FC<MenuProps> = ({ onStartGame }) => {
    return (
        <div className="menu">
            <button onClick={onStartGame}>Play Game</button>
        </div>
    );
};

export default Menu;
