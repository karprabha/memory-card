import menuImgURL from "../assets/images/menu-2.png";
import logoURL from "../assets/images/logo.png";

interface MenuProps {
    onStartGame: () => void;
}

const Menu: React.FC<MenuProps> = ({ onStartGame }) => {
    return (
        <div className="menu">
            <img src={logoURL} alt="logo" className="logo" />
            <img src={menuImgURL} alt="menu" />
            <div className="menu-btn-container">
                <button onClick={onStartGame}>Play Game</button>
            </div>
        </div>
    );
};

export default Menu;
