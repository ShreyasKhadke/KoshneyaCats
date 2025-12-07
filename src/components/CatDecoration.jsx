import creamCat from '../assets/cream.png'
import neonCat from '../assets/neon.png'
import greenCat from '../assets/green.png'
import orangeCat from '../assets/orange.png'
import pinkCat from '../assets/pink.png'

const CatDecoration = ({ setTheme, playMeow }) => {
    return (
        <div className="cat-container">
            <img
                src={creamCat} alt="Cream Cat" className="cat-decoration cat-1"
                onClick={() => { setTheme('cream'); playMeow(); }}
                title="Cream Theme"
            />
            <img
                src={neonCat} alt="Neon Cat" className="cat-decoration cat-2"
                onClick={() => { setTheme('neon'); playMeow(); }}
                title="Neon Theme"
            />
            <img
                src={greenCat} alt="Sage Cat" className="cat-decoration cat-3"
                onClick={() => { setTheme('sage'); playMeow(); }}
                title="Sage Theme"
            />
            <img
                src={orangeCat} alt="Orange Cat" className="cat-decoration cat-4"
                onClick={() => { setTheme('orange'); playMeow(); }}
                title="Orange Theme"
            />
            <img
                src={pinkCat} alt="Pink Cat" className="cat-decoration cat-5"
                onClick={() => { setTheme('rose'); playMeow(); }}
                title="Rose Theme"
            />
        </div>
    );
};

export default CatDecoration;
